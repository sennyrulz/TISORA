import express from "express";
import bodyParser from "body-parser";
// import connectDB from "./connection/database.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import paymentRoute from './routes/paymentRoute.js';
import adminPaymentRoutes from './routes/adminPaymentRoutes.js'
import productRoute from './routes/productRoute.js';
// import emailVerifyRoute from './routes/emailVerifyRoute.js'
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

// // Enable CORS after definition
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Middleware
app.use(express.json());
// app.use(cookieParser);
app.use(fileUpload({ useTempFiles: true }));
app.use('/api/payments/webhook', express.raw({ type: 'application/json' })); // raw for webhook
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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

// Routes endpoints
app.use(userRoute);
app.use(adminRoute);
app.use(productRoute);
app.use('/api/payments', paymentRoute);
app.use(adminPaymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map(val => val.message).join(', ')
    });
  }

  // Handle Mongoose cast errors (like invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
