import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
  },

  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Admin", 
    required: true 
  },

}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
