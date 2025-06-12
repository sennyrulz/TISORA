import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';
import Goods from '../models/productModel.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const streamUpload = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (result) {
          resolve({
            publicId: result.public_id,
            size: result.bytes,
          });
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

export const createProducts = async (req, res) => {
  const {
    productName,
    desc,
    features,
    material,
    sizes,
    price,
  } = req.body;

  if (!productName || !desc || !features || !material || !sizes || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ message: 'At least two images are required' });
  }

  try {
    const uploadedImages = await Promise.all(
      req.files.map(file => streamUpload(file.buffer))
    );

    const newProduct = new Goods({
      admin: req.user.userId, // make sure this is set by your auth middleware
      productName,
      desc,
      features,
      material,
      sizes,
      price,
      pictures: uploadedImages,
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
