import axios from 'axios';
import Payment from '../models/paymentModel.js';
import crypto from 'crypto';


export const initiatePayment = async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: customer.email,
        amount: Math.round(totalAmount * 100),
        metadata: { customer, items },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        }
      },
    );

    const { reference, authorization_url } = response.data.data;

    await Payment.create({
      customer,
      items,
      totalAmount,
      paymentMethod,
      reference,
      status: "pending",
    });

    res.status(200).json({ url: authorization_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};

export const verifyWebhook = async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Unauthorized webhook");
  }

  const event = req.body;

  if (event.event === "charge.success") {
    const payment = await Payment.findOne({ reference: event.data.reference });

    if (payment) {
      payment.status = "success";
      payment.paidAt = event.data.paid_at;
      await payment.save();
    }
  }

  res.sendStatus(200);
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payments' });
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
