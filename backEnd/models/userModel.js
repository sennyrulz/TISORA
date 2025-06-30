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
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    items: [{ type: mongoose.Schema.Types.Mixed, ref: "Payment"}],

    admin: { 
        type: Boolean, 
        default: false 
    },
},  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
