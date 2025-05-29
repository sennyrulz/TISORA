import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ url: result.secure_url });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
