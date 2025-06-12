import mongoose from "mongoose";

const adminOrderSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    images: {
      type: [
        {
          publicId: {
            type: String,
            required: true,
          },
          size: {
            type: Number,
            required: true,
            validate: {
              validator: function (v) {
                return v <= 10 * 1024 * 1024; // 10MB max
              },
              message: "Each image must be 10MB or smaller.",
            },
          },
        },
      ],
      validate: [
        {
          validator: function (arr) {
            return arr.length <= 2;
          },
          message: "Maximum of 2 images allowed.",
        },
      ],
    },

    orderName: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    material: {
      type: String,
      required: true,
    },

    sizes: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL", "XXXL"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminOrder = mongoose.model("AdminOrder", adminOrderSchema);

export default AdminOrder;
