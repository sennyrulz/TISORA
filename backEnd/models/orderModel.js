// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orders: [
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Order", orderSchema);
