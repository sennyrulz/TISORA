import mongoose from "mongoose";

const productSchema = new mongoose.Schema (
  {
    // id: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Admin" 
    // },
    pictures: {
      type: [
        {
          publicId: { 
            type: String, 
            required: true 
            }, // For Cloudinary image deletion

          size: { 
            type: Number, 
            required: true 
        }, // File size in bytes
        },
      ], validate: [
        {
          validator: function (pics) {
            return pics.length <= 2; // Max 2 images
          },
          message: "A product can have a maximum of 2 images.",
        },
        {
          validator: function (pics) {
            return pics.every((pic) => pic.size <= 10 * 1024 * 1024); // Max 10MB
          },
          message: "Each picture must not exceed 10MB.",
        },
      ],
    },
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
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },  
  },{ timestamps: true }
);

const Goods = mongoose.model("Goods", productSchema);

export default Goods;