import express from express;
import upload from '../middleware/multer.js';
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/productModel.js";
import { authenticateToken } from '../middlewares/authMid.js'

const router = express.Router();

// POST /admin/products
router.post("/admin-uploads", authenticateToken, upload.array("images", 2), async (req, res) => {
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
router.get("/all", authenticateToken, async (req, res) => {
  const products = await Product.find({ admin: req.user._id });
  res.json(products);
});

// DELETE /admin/products/:id
router.delete("/:id", authenticateToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  for (const img of product.pictures) {
    await cloudinary.uploader.destroy(img.publicId);
  }

  await product.remove();
  res.json({ message: "Deleted" });
});

export default router;
