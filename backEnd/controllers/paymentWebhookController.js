import crypto from 'crypto';
import Payment from '../models/paymentModel.js';
import Order from "../models/orderModel.js";


export const verifyPaymentWebhook = async (req, res) => {
  console.log("WEBHOOK RECEIVED DATA:", JSON.stringify(data.metadata, null, 2));

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
    const userId = data.metadata?.user; //added this 

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
   // Parse metadata (only if frontend is sending stringified JSON)
  const parsedOrder = JSON.parse(data.metadata?.order || '{}');
  const parsedCustomer = JSON.parse(data.metadata?.customer || '{}');

    // Create new payment
    payment = new Payment({ 
      user: parsedCustomer.user,  // ✅ Required         
      reference: data.reference,
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
      specialInstructions: parsedOrder.specialInstructions || "",
      billingAddress: parsedOrder.billing || {},
      items: parsedOrder.items || []
    });
      await payment.save();
    }

    const createdOrder = await Order.create({
      user: parsedCustomer.user,
      items: parsedOrder.items.map(i => ({
        product: i.id || i.productId,
        productName: i.productName,
        quantity: i.quantity,
        price: i.price,
      })),
      totalAmount: data.amount / 100,
      paymentStatus: 'paid',
    });
    return res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error in webhook handler:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
res.sendStatus(200);
};
