import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    required: true 
    },
  items: [
    {
      product: String,
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered'], 
    default: 'pending' 
  },
  shippingAddress: Object,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
