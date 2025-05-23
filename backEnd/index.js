import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../backEnd/connection/database.js";
import allRoutes from "../backEnd/routes/allRoute.js";
import adminRoutes from "../backEnd/routes/adminRoute.js";
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

dotenv.config();

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

connectDB();

app.use(fileUpload({ useTempFiles: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use("/", allRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

// // Serve React static files for admin frontend
// app.use(express.static(path.join(__dirname, '../../admin-frontend/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../admin-frontend/build', 'index.html'));
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
