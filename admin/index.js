// import React from 'react'
import express from "express"
import fileUpload from 'express-fileupload';
import  adminRoute from "../../backEnd/routes/adminRoute.js";
import mongoose from 'mongoose'
// import  productRoute from "./routes/productRoute.js";


const app = express();
const router = express.Router();

mongoose.connect("mongodb+srv://Tisora:12345@cluster0.0zyfw.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0")
const PORT = process.env.PORT || 5173;

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

//Routes
app.use(adminRoute)


app.listen(PORT, ()=>{
  console.log(`Admin is running in ${PORT}`)
})
