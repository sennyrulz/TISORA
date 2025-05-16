import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../connection/database.js";
import allRoutes from "./routes/allRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
const PORT = process.env.PORT || 5173;

dotenv.config();
connectDB();
const app = express();

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
