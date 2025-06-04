import axios from 'axios';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize Payment
const initializePayment = async (req, res) => {
    try {
        const { email, amount, currency = 'NGN', metadata } = req.body;

        // Validation of required fields
        if (!email || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Email and amount are required',
            })
        }

        // Generate a unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

        // Prepare Paystack payment data
        const paymentData = {
            email,
            amount: parseInt(amount),
            currency,
            reference: `${orderId}-${Date.now()}`,
            metadata: {
                ...metadata,
                orderId,
            }
        };

        // Intialize payment with Paystack
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.status) {
            // Create order record
            const order = new Order({
                orderId,
                customer: metadata.customer,
                items: metadata.order.items.map(item => ({
                    ...item,
                    total: item.price * item.quantity
                })),
                shipping: metadata.order.shipping,
                payment: {
                    reference: paymentData.reference,
                    amount: amount,
                    currency: currency,
                    status: 'pending',
                },
                totalAmount: amount / 100
            });

            await order.save();

            return res.status(200).json({
                success: true,
                message: 'Payment initialized successfully',
                data: {
                    reference: paymentData.reference,
                    authorization_url: response.data.data.authorization_url,
                    access_code: response.data.data.access_code,
                    orderId
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment initialization failed',
                error: response.data.message
            });
        }
    } catch (error) {
        console.error('Payment initialization error:', error);
        return res.status(500).json({
            success: false,
            message: 'Payment initialization failed',
            error: error.message
        });
    }
};

// Verify Payment
const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.body;

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: 'Payment reference is required',
            });
        }

        // Verify payment with paystack
        const response = await axios.get(
            `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.status && response.data.data.status === 'success') {
            // Find and update order
            const order = await Order.findOne({ 'payment.reference': reference });

            if (order) {
                order.payment.status = 'successful';
                order.payment.paidAt = new Date();
                order.status = 'processing';
                await order.save();

                return res.status(200).json({
                    success: true,
                    message: 'Payment verified successfully',
                    data: {
                        order,
                        transaction: response.data.data
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed',
                data: response.data
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message
        });
    }
}

// Webhook handler for paystack
const handleWebhook = async (req, res) => {
    try {
        const hash = crypto
            .createHmac('sha512', PAYSTACK_SECRET_KEY)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (hash !== req.headers['x-paystack-signature']) {
            return res.status(400).json({
                success: false,
                message: 'Invalid signature',
            });
        }

        const event = req.body;

        switch (event.event) {
            case 'charge.success':
                // Handle successful payment
                const order = await Order.findOne({ 'payment.reference': event.data.reference });

                if (order && order.payment.status === 'pending') {
                    order.payment.status = 'successful';
                    order.payment.paidAt = new Date();
                    order.status = 'processing';
                    await order.save();
                }

                // Email notification here if needed
                console.log(`Payment for order ${order.orderId} was successful`);
            break;
            
            case 'charge.failed':
                // Handle failed payment
                const failedOrder = await Order.findOne({ 'payment.reference': event.data.reference });

                if (failedOrder) {
                    failedOrder.payment.status = 'failed';
                    await failedOrder.save();

                    console.log(`Payment failed for order: ${failedOrder.orderId}`);
                }
                break;

            default:
                console.log(`Unhandled event: ${event.event}`);
        }

        return res.status(200).json({
            success: true,
            message: 'Webhook processed successfully',
        });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({
            success: false,
            message: 'Webhook processing failed',
        });
    }
};

export { initializePayment, verifyPayment, handleWebhook };