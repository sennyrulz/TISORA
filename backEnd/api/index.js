import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
// import serverless from 'serverless-http';

// import connectDB from "./connection/database.js";
import userRoute from "../routes/userRoute.js";
import adminRoute from "../routes/adminRoute.js";
import paymentRoute from '../routes/paymentRoute.js';
// import productRoute from '../../routes/productRoute.js';
import orderRoute from "../routes/orderRoute.js";
import checkoutRoute from "../routes/checkoutRoute.js";
// import emailVerifyRoute from './routes/emailVerifyRoute.js'


dotenv.config();
const app = express();

// // Enable CORS after definition

const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174',
  "https://www.tisoraa.com",
  "https://tisoraa.com",
  "https://tisora-frontend.onrender.com",
  'https://tisora-admin.onrender.com', 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('❌ CORS blocked request from origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use('/api/payments/webhook', 

express.raw({ type: 'application/json' })); 
app.use(express.urlencoded({ extended: true }));

// Create Connection
mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log("❌ MongoDB connection error:"));

// Routes endpoints
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
// app.use('/api/products', productRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/orders', orderRoute);
app.use('/api/payments', paymentRoute);

//currency
app.set('trust proxy', true);

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


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


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// export const handler = serverless(app);
