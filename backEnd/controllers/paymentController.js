import axios from 'axios';
import Payment from '../models/paymentModel.js';
import crypto from 'crypto';
import userModel from '../models/userModel.js';
import Order from "../models/orderModel.js"

export const verifyTransaction = async (req, res) => {
  const userId = req.user?.id;
  try {
    const { reference } = req.params;
    console.log('Verifying payment with reference:', reference);

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    if (!response.data.status) {
      return res.status(400).json({ success: false, message: `Payment verification failed: ${response.data.message}` });
    }

    const data = response.data.data;
    const payment = await Payment.findOne({ reference });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    payment.status = data.status === 'success' ? 'success' : 'failed';
    payment.paidAt = data.paid_at;
    payment.customer.email = data.customer.email;
    await payment.save();

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        status: payment.status,
        reference: payment.reference,
        amount: payment.totalAmount,
        paidAt: payment.paidAt,
        customer: payment.customer,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Payment verification failed' });
  }
};

export const verifyWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const data = event.data;
    const reference = data.reference;
    const id = data.metadata?.id;

    try {
      const existing = await Payment.findOne({ reference });
      if (existing) return res.status(200).json({ message: 'Already processed' });

    const parsedOrder = JSON.parse(data.metadata.order || '{}');
    const parsedCustomer = JSON.parse(data.metadata.customer || '{}');

    const newPayment = new Payment({
      user: parsedCustomer.user, // ✅ comes from your own frontend metadata
      reference: data.reference,
      amount: data.amount / 100,
      currency: data.currency,
      status: "pending",
      paidAt: null,
      customer: {
        firstName: data.customer?.first_name || "",
        lastName: data.customer?.last_name || "",
        email: data.customer?.email || "",  // ✅ required!
        phone: data.customer?.phone || "",
      },
      items: parsedOrder.items || [],
      billingAddress: parsedOrder.billing || {},
      specialInstructions: parsedOrder.specialInstructions || "",
    });
      const savedPayment = await newPayment.save();
      await userModel.findByIdAndUpdate(
        id, 
        { $push: { payments: savedPayment.id }},
        { new: true }
      );
      
        return res.status(200).json({ message: 'Payment verified and saved' });
    } catch (err) {
      console.error('Error saving payment:', err);
      return res.status(500).json({ message: 'Payment verification failed' });
    }
  }
  res.status(200).json({ message: 'Webhook received' });
};

export const initializePayment = async (req, res) => {
  console.log('✅ Starting payment with data:', req.body);

  try {
    const userId = req.user?.id; // Set by your `authenticateToken` middleware
    const { email, amount, currency, metadata } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ success: false, message: 'Email and amount are required' });
    }

    // Parse metadata
    const parsedCustomer = JSON.parse(metadata.customer || '{}');
    const parsedOrder = JSON.parse(metadata.order || '{}');

    // 🔗 Call Paystack to initialize payment
    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: Math.round(amount),
        currency: currency || 'NGN',
        metadata: {
          ...metadata,
          userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    const { reference, authorization_url } = paystackResponse.data.data;

    // 💾 Save to DB
    const savedOrder = await Order.create({
      user: userId,
      items: parsedOrder.items,
      totalAmount: amount / 100,
      reference,
      billingAddress: parsedOrder.billing || {},
      status: 'pending',
    });

  //link order to user
    await userModel.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id }
    });

  //Save payment
    const savedPayment = await Payment.create({
      user: userId,
        order: savedOrder._id,
        customer: {
        firstName: parsedCustomer.firstName,
        lastName: parsedCustomer.lastName,
        email: parsedCustomer.email,
        phone: parsedCustomer.phone,
      },
      items: parsedOrder.items?.map((item) => ({
        productId: item._id || item.id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })) || [],
      totalAmount: amount / 100,
      paymentMethod: 'paystack',
      reference,
      status: 'pending',
      specialInstructions: parsedOrder.specialInstructions || '',
      billingAddress: parsedOrder.billing || {},
    });

  //Link payment to user
    await userModel.findByIdAndUpdate(userId,
      { $push: { payments: savedPayment._id }},
      { new: true }
    );

    // 🎯 Return URL to frontend
    return res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        reference,
        authorization_url,
      },
    });

  } catch (error) {
    console.error('❌ Payment initialization error:', error);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message || 'Server error',
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    
    const userId = req.user._id;
    const allPayments = await Payment.find({user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: allPayments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};


export const paystackWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const data = event.data;

    const payment = await Payment.findOneAndUpdate(
      { reference: data.reference },
      {
        status: 'success',
        paidAt: data.paid_at,
        customer: {
          email: data.customer.email,
        },
      },
      { new: true, upsert: true }
    );

    console.log('💰 Payment success recorded:', payment.reference);
  }

  res.sendStatus(200);
};
