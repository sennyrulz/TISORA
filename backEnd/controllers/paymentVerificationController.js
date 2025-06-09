// controllers/paymentController.js
import axios from "axios";
import Payment from "../models/paymentModel.js";

export const verifyPayment = async (req, res) => {
  const { ref } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    // Update payment record
    const payment = await Payment.findOne({ transactionRef: ref });

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    payment.paymentStatus = paymentData.status;
    payment.verified = paymentData.status === "success";
    payment.gatewayResponse = paymentData;
    await payment.save();

    res.status(200).json({
      message: "Payment verified",
      payment,
    });
  } catch (error) {
    console.error("Verification failed:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};
