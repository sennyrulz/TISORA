import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema ({
    id: {
          type: mongoose.Schema.Types.ObjectId, 
          required: true,
          unique: true,
          ref: "User"
        },
    token: {
        type: String,
        required: true
    },
},  { timestamps: true, expires: 3600 }
)

const tokenModel = mongoose.model("token", tokenSchema);

export default tokenModel;