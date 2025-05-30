import express from "express";
import bodyParser from "body-parser";
import connectDB from "./connection/database.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import paymentRoute from './routes/paymentRoute.js'
import productRoute from './routes/productRoute.js'
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//Create Connection
mongoose.connect(process.env.MONGODBURL || "mongodb://localhost:27017/eCommerce")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// connectDB();

// ✅ CORS config
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Manually allow OPTIONS passthrough (alternative to above)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Middleware
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Routes endpoints
//app.use(userRoute) app.use(adminRoute);
app.use("/", userRoute);
app.use("/payment", paymentRoute)
app.use("/admin", adminRoute);
app.use("/admin/products", productRoute);

//✅ Error handler (should be last!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
