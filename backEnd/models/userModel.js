import mongoose from "mongoose";

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
        type: Number,
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
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders"}],
    checkout: [{ type: mongoose.Schema.Types.ObjectId, ref: "Checkout"}],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],


    admin: { 
        type: Boolean, 
        default: false 
    },
},  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
