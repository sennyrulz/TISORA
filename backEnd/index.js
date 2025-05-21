const express = require("express")
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../backEnd/connection/database.js";
import allRoutes from "../backEnd/routes/allRoute.js";
import adminRoutes from "../backEnd/routes/adminRoute.js";

const PORT = process.env.PORT || 5173;

import fileUpload from 'express-fileupload';

app.use(fileUpload({
  useTempFiles: true,
}));


dotenv.config();
connectDB();
const app = express();
app.use(express.json)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route
app.use("/api", allRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something went wrong");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
