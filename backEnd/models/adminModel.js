import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {   
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
          },
          phone: {
            type: String,
            required: true,
            match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
          },
        address: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: true
        },
    },  { timestamps: true }
);

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;