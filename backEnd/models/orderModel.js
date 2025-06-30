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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

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
});

export default mongoose.model("Order", orderSchema);
