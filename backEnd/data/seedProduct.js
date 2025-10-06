import dotenv from 'dotenv';
dotenv.config();

console.log("MONGODBURL from .env:", process.env.MONGODBURL); // 👈 Debug log

import mongoose from "mongoose";
import productModel from "../models/productModel.js"; // go up one level
import { productsData } from "./Product.js"; // same folder

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Connected to DB");

  // Optional: Clear existing products
  await productModel.deleteMany();

  const inserted = await productModel.insertMany(productsData);
  console.log(`✅ ${inserted.length} products seeded.`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from DB");
}).catch((err) => {
  console.error("❌ DB connection error:", err.message);
});
