// import React from 'react'
import express from "express"
import fileUpload from 'express-fileupload';
import  adminRoute from "../../backEnd/routes/adminRoute.js";
import mongoose from 'mongoose'
import 'bootstrap/dist/css/bootstrap.min.css';
// import  productRoute from "./routes/productRoute.js";


const app = express();
const router = express.Router();

mongoose.connect(process.env.MONGODBURL);
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

//Routes
app.use(adminRoute)


app.listen(PORT, ()=>{
  console.log(`Admin is running in ${PORT}`)
})
