import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },

    // kyc: {
    //     type: [String],
    //     ref: "Kyc"
    // },
    // token: { type: mongoose.Types.ObjectId, ref: "Token"},
    
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    checkout: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout"},
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}],

    user: { 
        type: Boolean, 
        default: true
      },
},  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
