import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false  // Changed from true to false
  },
  reference: { 
    type: String, 
    required: true, 
    unique: true 
  },
  customer: {
    firstName: { 
        type: String 
    },
    lastName: { 
        type: String 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String 
    }
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.Mixed,  // This allows both ObjectId and String
        ref: 'Product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String,
    default: 'paystack'
  },
  status: { 
    type: String, 
    enum: ["pending", "success", "failed"], 
    default: "pending" 
  }, 
  paidAt: { 
    type: Date 
  },
  specialInstructions: {
    type: String,
    default: ""
  },
  billingAddress: {
    country: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    apartment: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    phone: { type: String }
  }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
