import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reference: { 
    type: String, 
    required: true, 
    unique: true 
},
  customer: {
    name: { 
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
      productId: String,
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
},
  paymentMethod: { 
    type: String 
},
  status: { 
    type: String, 
    default: "pending" 
}, // pending, success, failed
  paidAt: { 
    type: Date 
},
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
