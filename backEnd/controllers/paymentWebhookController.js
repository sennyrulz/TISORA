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
    const userId = data.metadata?.iserId; //added this 

    if (!userId) {
      console.error('❌ userId missing in metadata');
      return res.status(400).json({ message: 'userId required in metadata' });
    }

    try {
      let payment = await Payment.findOne({ reference: data.reference });
        
      if (payment) {
          payment.status = 'success',
          payment.paidAt = data.paid_at ? new Date(data.paid_at) : new Date(),
        await payment.save();
        } else {
        // Create new payment
        payment = new Payment({          
          reference: data.reference,
          user: userId, // ✅ Required
          customer: {
          firstName: data.customer.first_name,
          lastName: data.customer.last_name,
          email: data.customer.email,
          phone: data.customer.phone,
        },
        totalAmount: data.amount / 100,
        paymentMethod: 'paystack',
        status: 'success',
        paidAt: new Date(data.paid_at),
        specialInstructions: data.metadata?.order?.specialInstructions || "",
        billingAddress: data.metadata?.order?.billing || {},
      });
      await payment.save();
    }
    return res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error in webhook handler:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
res.sendStatus(200);
};
