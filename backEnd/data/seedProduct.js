import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root folder (two levels up from current file)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import mongoose from "mongoose";
import productModel from "../models/productModel.js"; 
import { productsData } from "./Product.js"; 

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
