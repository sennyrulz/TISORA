import mongoose from "mongoose";

  const imageSchema = new mongoose.Schema({ 
    publicId: String, 
    size: Number,
  });

const productSchema = new mongoose.Schema (
  {
    Img1: [imageSchema],
    Img2: [imageSchema],

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
    
    // category: { 
    //   type: String, 
    //   required: true 
    // },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });

const productModel = mongoose.model("Product", productSchema);
export default productModel;