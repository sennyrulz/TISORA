import crypto from 'crypto';
import Payment from '../models/paymentModel.js';

export const verifyPaymentWebhook = async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ message: 'Unauthorized webhook' });
  }

  const event = req.body;
  if (event.event === 'charge.success') {
    const data = event.data;

    try {
      await Payment.findOneAndUpdate(
        { reference: data.reference },
        {
          status: 'success',
          paidAt: data.paid_at ? new Date(data.paid_at) : new Date(),
        },
        { new: true }
      );

      return res.sendStatus(200);
    } catch (err) {
      console.error('Error updating payment:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.sendStatus(200);
};
