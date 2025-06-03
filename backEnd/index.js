import express from "express";
import bodyParser from "body-parser";
// import connectDB from "./connection/database.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import paymentRoute from './routes/paymentRoute.js';
import productRoute from './routes/productRoute.js';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// // Enable CORS after definition
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Handle OPTIONS preflight requests globally
// app.options('*', cors());

// Handle OPTIONS preflight requests manually
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204); // No content
  }
  next();
});

// Create Connection
mongoose
  .connect(process.env.MONGODBURL)
  // || "mongodb://localhost:27017/Tisora")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());


// Routes endpoints
app.use('/users', userRoute);
app.use('/payments', paymentRoute);
app.use('/admin', adminRoute);
app.use('/products', productRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
