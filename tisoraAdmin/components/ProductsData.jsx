import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
        },
          publicId: { 
            type: String, 
            required: true 
        },
        },
      ],
      validate: {
        validator: function (pics) {
          if (pics.length > 2) return false;
          return pics.every((pic) => pic.size <= 10 * 1024 * 1024); // 10MB
        },
        message:
          "A product can have a maximum of 2 images, and each must not exceed 10MB.",
      },
    },
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
      ref: "Admin",
    },
    category: {
      type: String,
      enum: ["new", "discount", "used"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
