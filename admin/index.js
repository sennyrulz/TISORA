// import React from 'react'
import express from "express"
import fileUpload from 'express-fileupload';
import  adminRoute from "../../backEnd/routes/adminRoute.js";
import mongoose from 'mongoose'
// import  productRoute from "./routes/productRoute.js";


const app = express();
const router = express.Router();

mongoose.connect("mongodb+srv://tisora:1110000@cluster0.e3iqsfd.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0")
const PORT = process.env.PORT || 5173;

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

//Routes
app.use(adminRoute)


app.listen(PORT, ()=>{
  console.log(`Admin is running in ${PORT}`)
})
