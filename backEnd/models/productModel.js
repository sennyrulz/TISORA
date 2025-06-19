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
    pictures: {
      type: [
        {
          publicId: { 
            type: String, 
            required: true 
            }
        },
      ], 
      // validate: [
      //   {
      //     validator: function (pics) {
      //       return pics.length <= 2; // Max 2 images
      //     },
      //     message: "A product can have a maximum of 2 images.",
      //   },
      //   {
      //     validator: function (pics) {
      //       return pics.every((pic) => pic.size <= 10 * 1024 * 1024); // Max 10MB
      //     },
      //     message: "Each picture must not exceed 10MB.",
      //   },
      // ],
    },
     admin:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
  },{ timestamps: true }
);


const productModel = mongoose.model("Product", productSchema);

export default productModel;