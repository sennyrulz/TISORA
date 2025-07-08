import mongoose from "mongoose";

  const imageSchema = new mongoose.Schema({ 
    publicId: String, 
    size: Number,
  });

const productSchema = new mongoose.Schema (
  {
    productName: { 
      type: String, 
      required: true 
    },
    desc: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    material: { 
      type: String, 
      required: true 
    },
    features: [String],
    sizes: String,
    Img1: [imageSchema],
    Img2: [imageSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });

const productModel = mongoose.model("Product", productSchema);
export default productModel;