import axios from "axios";

export const initiatePayment = async (req, res) => {
    try {
        const { customer, items, totalAmount, paymentMethod } = req.body;
        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email: customer.email,
                amount: Math.round(totalAmount * 100),
                metadata: {
                    customer,
                    items,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        )

        const { authorization_url } = response.data.data;
        res.status(200).json({ url: authorization_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Payment initialization failed" });
    }
}