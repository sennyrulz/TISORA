import express from express;
import upload from '../middleware/multer.js';
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/productModel.js";
import { authenticateAdmin } from '../middlewares/adminMid.js'
import multer from 'multer';

const route = express.Route();
const upload = multer({dest: "uploads/"})

// POST /admin/productupload
route.post("/productUploads", authenticateAdmin, upload.array("images", 2), 
  
async (req, res) => {
  try {
    const { productName, desc, features, material, sizes, price } = req.body;

    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) throw error;
          return result;
        });
        return {
          url: result.secure_url,
          publicId: result.public_id,
          size: file.size,
        };
      })
    );

    const product = await Product.create({
      productName,
      desc,
      features: typeof features === "string" ? features.split(",") : features,
      material,
      sizes,
      price,
      pictures: images,
      admin: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET /admin/products
route.get("/allProducts", authenticateAdmin, async (req, res) => {
  const { id } = req.body;
  const allProducts = await Product
  .find({ admin: id })
  .populate("orders")
  .populate("checkout")
  .populate("orders")
  .populate("payments")
  return res.json(allProducts);
});

// UPDATE /admin/products
route.put("/updateProducts", authenticateAdmin, async (req, res) => {
  const adminId = req.admin._id;
  const { productId } = req.params;
  const body = req.body;
    try{
      const product = await Product.findById(productId);
      if(!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

      if(adminId != product.admintoString()) {
      return res.status(403).json({ message: "You are not authorized to update this product" });
    }

  const updatedProduct = await Product.findByIdAndUpdate
    (productId, 
      body, { new: true });

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  });

// DELETE /admin/products/:id
route.delete("/:id", authenticateAdmin, 
  async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) 
    return res.status(404).json({ message: "Not found" });

  for (const img of product.pictures) {
    await cloudinary.uploader.destroy(img.publicId);
  }

  await product.remove();
  res.json({ message: "Deleted" });
});

export default route;
