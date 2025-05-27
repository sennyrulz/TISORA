// import React from 'react'
import express from "express"
import fileUpload from 'express-fileupload';
import  adminRoute from "../../backEnd/routes/adminRoute.js";
import mongoose from 'mongoose'
import 'bootstrap/dist/css/bootstrap.min.css';
// import  productRoute from "./routes/productRoute.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/eCommerce");

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

//Routes
app.use("/admin", adminRoute);

//✅ Error handler (should be last!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Admin is running in ${PORT}`)
})
