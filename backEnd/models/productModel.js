import mongoose from "mongoose";

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
    features: { 
          type: String, 
          required: true 
      },
    material: { 
        type: String, 
        required: true 
    },
    sizes: { 
        type: String,
        enum: ['M', 'L', 'XL', 'XXL', 'XXXL'],
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },  
    pictures: [ 
      { publicId: {  type: String, required: true  }}
    ],
  admin:{ type: mongoose.Schema.Types.ObjectId, ref: "Admin",required: true },
  }, 
  { timestamps: true }
);


const productModel = mongoose.model("Product", productSchema);

export default productModel;