// import React from 'react'
import express from "express"
import fileUpload from 'express-fileupload';
import  adminRoute from "../backEnd/routes/adminRoute.js";
// import  productRoute from "./routes/productRoute.js";

const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5173;

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));


//Routes
router.get("/api/admin", adminRoute)
// app.use(productRoute)
// app.use(allRoute)

app.listen(PORT, ()=>{
  console.log(`Admin is running in ${PORT}`)
})
