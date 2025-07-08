import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({   
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },
    
  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  // token: { type: mongoose.Types.ObjectId, ref: "Token"},
  products: { type: mongoose.Types.ObjectId, ref: "Product" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],

  admin: {
    type: Boolean,
    default: true
  },
},  
  { timestamps: true }
);

// Hash password before save
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
// adminSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;