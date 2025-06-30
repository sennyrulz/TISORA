import axios from 'axios';
import Payment from '../models/paymentModel.js';
import crypto from 'crypto';

export const verifyTransaction = async (req, res) => {
  try {
    const { reference } = req.params;
    console.log('Verifying payment with reference:', reference);

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
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
    .createHmac('sha512', process.env.PAYSTACK_SECRETKEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const data = event.data;
    const reference = data.reference;
    const userId = data.metadata?.userId;

    try {
      const existing = await Payment.findOne({ reference });
      if (existing) return res.status(200).json({ message: 'Already processed' });

      const newPayment = new Payment({
        reference,
        status: data.status,
        amount: data.amount / 100,
        currency: data.currency,
        paidAt: data.paid_at,
        customer: {
          firstName: data.customer.first_name,
          lastName: data.customer.last_name,
          email: data.customer.email,
          phone: data.customer.phone,
        },
        items: data.metadata?.items || [],
        metadata: data.metadata?.customer || {},
        user: userId,
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

export const initializePayment = async (req, res) => {
  console.log('Initiating payment with data:', req.body);
  console.log("Loaded PAYSTACK_SECRETKEY:", process.env.PAYSTACK_SECRETKEY);

  try {
    const userId = req.user?._id;
    const { email, amount, currency, metadata } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ success: false, message: 'Email and amount are required' });
    }

    const response = await axios.post(
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
          Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || 'Payment initialization failed');
    }

    const { reference, authorization_url } = response.data.data;

    await Payment.create({
      user: userId,
      customer: metadata.customer,
      items:
        metadata.order?.items?.map((item) => ({
          productId: item._id || item.id,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        })) || [],
      totalAmount: amount / 100,
      paymentMethod: 'paystack',
      reference,
      status: 'pending',
      specialInstructions: metadata.order?.specialInstructions || '',
      billingAddress: metadata.order?.billing || {},
    });

    return res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      data: { reference, authorization_url },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Payment initialization failed' });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const userId = req.user?._id;
    const payments = await Payment.find({ user: userId }).populate('user');
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Error fetching payments' });
  }
};

export const paystackWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRETKEY)
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
