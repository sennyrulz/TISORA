import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    desc: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    category: { 
        type: String, 
        enum: ["new", "discount", "used"], 
        default: "new" 
    },
    pictures: {
      type: [
        {
          url: { 
            type: String, 
            required: true 
        },
          size: { 
            type: Number, 
            required: true 
        }, // File size in bytes
          publicId: { 
            type: String, 
            required: true 
            }, // For Cloudinary image deletion
        },
      ],
      validate: [
        {
          validator: function (pics) {
            return pics.length <= 4; // Max 4 images
          },
          message: "A product can have a maximum of 4 images.",
        },
        {
          validator: function (pics) {
            return pics.every((pic) => pic.size <= 10 * 1024 * 1024); // Max 10MB
          },
          message: "Each picture must not exceed 10MB.",
        },
      ],
    },
  },
  { timestamps: true }
);

const Goods = mongoose.model("Goods", productSchema);

export default Goods; //worked here
