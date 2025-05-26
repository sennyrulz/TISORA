import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./connection/database.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
// import mongoose from "mongoose";

dotenv.config();
const app = express();

//Create connection
// mongoose.connect("mongodb://localhost:27017/Tisora")

connectDB();

app.use(fileUpload({ useTempFiles: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//creating endpoints for user and admin DB
app.use("/users", userRoute);
app.use("/", adminRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
