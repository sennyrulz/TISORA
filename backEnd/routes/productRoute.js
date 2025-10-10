import express from "express";
import axios from "axios";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    console.log("🟢 Product route hit with ID:", req.params.id);

    const ip =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.ip ||
      "::1";

    console.log("🧠 IP debug:", {
      "req.ip": req.ip,
      "x-forwarded-for": req.headers["x-forwarded-for"],
      "x-real-ip": req.headers["x-real-ip"],
      resolvedIP: ip,
    });

    // 🔹 Declare currency at the top to avoid ReferenceError
    let currency = "NGN"; // Default fallback

    // 🔹 Skip GeoIP for local testing
    if (ip === "::1" || ip === "127.0.0.1") {
      console.log("💻 Localhost detected — defaulting to NGN");
    } else {
      try {
        const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = geoRes.data?.country_name;
        console.log("🌍 Detected country:", country);

        if (country === "Canada") currency = "CAD";
        else if (country === "United States") currency = "USD";
        else if (country === "United Kingdom") currency = "GBP";
        else currency = "NGN";

        console.log(`🌍 Currency set to ${currency} for country: ${country}`);
      } catch (geoError) {
        console.log("❌ GeoIP lookup failed:", geoError.message);
        console.log("🌍 Defaulting to NGN");
      }
    }

    // 🔹 Fix: find by custom id field instead of _id
    const product = await productModel.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product.toObject(),
      currency,
    });
  } catch (error) {
    console.error("❌ DB error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
