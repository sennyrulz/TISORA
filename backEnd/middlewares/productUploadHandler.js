import Goods from '../models/productModel.js'; // assuming this is your product model
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRE,
});

const storage = multer.memoryStorage()
const upload = multer({ storage });

const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

export const createProducts = async (req, res) => {
  const {
    productName,
    desc,
    features,
    materials,
    sizes,
    price,
  } = req.body;

  if (!productName || !desc || !features || !materials || !sizes || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ message: 'At least two images are required' });
  }

  try {
    // Upload images to Cloudinary
    const uploadPromises = req.files.map(file => streamUpload(file.buffer));
    const uploadedUrls = await Promise.all(uploadPromises);

    const newProduct = new Goods({
      adminId: req.user.userId, // assuming this comes from JWT middleware
      productName,
      desc,
      features,
      materials,
      sizes,
      price,
      pictures: uploadedUrls
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

export default upload;