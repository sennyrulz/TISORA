import axios from 'axios';
import Payment from '../models/paymentModel.js';
import crypto from 'crypto';


const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const verifyTransaction = async (req, res) => {
  try {
    const { reference } = req.params;
    console.log('Verifying payment with reference:', reference);

    // Verify with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    console.log('Paystack verification response:', response.data);

    if (!response.data.status) {
      return res.status(400).json({
        success: false,
        message: `Payment verification failed: ${response.data.message}`
      });
    }

    const { data } = response.data;

    // Find and update payment record
    const payment = await Payment.findOne({ reference });
    console.log('Found payment record:', payment);

    if (!payment) {
      console.log('Payment record not found');
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }

    // Update payment status
    payment.status = data.status === 'success' ? 'success' : 'failed';
    payment.paidAt = data.paid_at;
    payment.email = data.customer.email;
    await payment.save();
    console.log('Updated payment record:', payment);

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        status: payment.status,
        reference: payment.reference,
        amount: payment.totalAmount,
        paidAt: payment.paidAt,
        customer: payment.customer
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

export const verifyWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // Compare with Paystack signature
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const paymentData = event.data;

    const {
      reference,
      amount,
      currency,
      status,
      paid_at,
      customer,
      metadata
    } = paymentData;

    try {
      // Check if already recorded
      const existing = await Payment.findOne({ reference });
      if (existing) {
        return res.status(200).json({ message: 'Already processed' });
      }

      const newPayment = new Payment({
        reference,
        status,
        amount: amount / 100,
        currency,
        paidAt: paid_at,
        customer: {
          name: customer.first_name + ' ' + customer.last_name,
          email: customer.email,
          phone: customer.phone
        },
        items: metadata.items || [],
        metadata: metadata.customer || {},
        raw: paymentData
      });

      await newPayment.save();
      return res.status(200).json({ message: 'Payment verified and saved' });
    } catch (err) {
      console.error('Error saving payment:', err);
      return res.status(500).json({ message: 'Payment verification failed' });
    }
  }

  res.status(200).json({ message: 'Webhook received' });
};

export const initiatePayment = async (req, res) => {
  console.log('Initiating payment with data:', req.body);
  try {
    const { email, amount, currency, metadata } = req.body;
    const userId = req.user.userId; // Using userId from JWT token

    if (!email || !amount) {
      console.log('Missing required fields:', { email, amount });
      return res.status(400).json({
        success: false,
        message: 'Email and amount are required'
      });
    }

    console.log('Calling Paystack API...');
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount),
        currency: currency || 'NGN',
        metadata: {
          ...metadata,
          userId // Include user ID in metadata
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    console.log('Paystack API response:', response.data);

    if (!response.data.status) {
      throw new Error(response.data.message || 'Payment initialization failed');
    }

    const { reference, authorization_url } = response.data.data;

    // Create payment record with user ID
    console.log('Creating payment record...');
    await Payment.create({
      user: userId,
      customer: metadata.customer,
      items: metadata.order.items.map(item => ({
        productId: item._id || item.id, // Handle both ._id and .id
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: amount / 100,
      paymentMethod: 'paystack',
      reference,
      status: "pending",
    });

    console.log('Payment initialized successfully');
    res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        reference,
        authorization_url
      }
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment initialization failed'
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments'
    });
  }
};

export const paystackWebhook = async (req, res) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
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
        email: data.customer.email
      },
      { new: true, upsert: true }
    );

    console.log('💰 Payment success recorded:', payment.reference);
  }

  res.sendStatus(200);
};
