import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customer : {
    email: { 
      type: String, 
      required: true 
    },
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  shipping: {
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    method: String,
  },
  payment: {
    reference: String,
    amount: Number,
    currency: String,
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },
    paidAt: Date,
    gateway: {
      type: String,
      default: 'paystack'
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "processing", "Shipped", "delivered", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;