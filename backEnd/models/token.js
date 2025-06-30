import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema ({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },

    admin: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true 
    },

    token: {
        type: String,
        required: true
    },
},  { timestamps: true, expires: 3600 }
)

const tokenModel = mongoose.model("Token", tokenSchema);

export default tokenModel;