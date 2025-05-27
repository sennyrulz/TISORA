import mongoose from "mongoose"

const adminProductUploadSchema = new mongoose.Schema (
  { 
    Id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Admin" 
    },

    Img1: [
      {
        publicId:{
          type: String,
          required: true,
          unique: true
        },
        size: {
        type: Number,
        required: true
      },
    }
    ],

    Img2: [
      {
        publicId:{
          type: String,
          required: true,
          unique: true
        },
        size: {
          type: Number,
          required: true
        },
      }
    ],

  productName:
    { 
      type: String,
      required: true,
      unique: true
    },

    desc:
      {
        type: String,
        required: true,
      },

    features: [],

    material: 
    { 
      type: String,
      required: true,
      unique: true
    },
    sizes:
    { 
      type: String,
      required: true,
      unique: true
    },
    price:
    { 
      type: String,
      required: true,
      unique: true
    },
  },
 
    { timestamps: true }
);

const adminProductUploadModel = mongoose.model("ProductUpload", productUploadSchema);

export default adminProductUploadModel;