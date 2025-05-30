import Goods from '../models/productModel.js';
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream({ folder: 'products' }, (err, result) => {
      if (err) return reject(err);
      resolve(result.secure_url);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Goods.find().populate('adminId', 'fullname email');
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Create a new product
export const createProducts = async (req, res) => {
    const {
        pictures,
        productName,
        desc,
        features,
        materials,
        sizes,
        price,
    } = req.body;

    // Validate required fields
    if (!productName || !desc || !features || !materials || !sizes || !price || !pictures) {
        return res.status(400).json({ message: 'All fields are required' });
    }

   // Validate image upload
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ message: 'At least two images are required' });
  }

  try {
    // Upload all images to Cloudinary
    const pictures = await Promise.all(
      req.files.map(file => uploadToCloudinary(file.buffer))
    );

    const newProduct = new Goods({
        adminId: req.user.userId, // from JWT middleware
        productName,
        desc,
        features,
        materials,
        sizes,
        price,
        pictures // Expecting Cloudinary image array
    });

        await newProduct.save();

        return res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: 'Failed to create product' });
    }
};

// Update an existing product
export const updateProducts = async (req, res) => {
    const { id, ...updates } = req.body;

    try {
        const updatedProduct = await Goods.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: 'Failed to update product' });
    }
};

// Delete a product
export const deleteProducts = async (req, res) => {
    const { id } = req.body;

    try {
        const deleted = await Goods.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: 'Failed to delete product' });
    }
};
