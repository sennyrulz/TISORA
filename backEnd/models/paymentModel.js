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
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
   admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Admin", 
    required: true },
  },
{ timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
