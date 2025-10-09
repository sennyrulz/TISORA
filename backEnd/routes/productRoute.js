import productModel from "../models/productModel.js";
import express from "express";
import axios from "axios";

const router = express.Router();

// Utility to get IP from request headers
// function getClientIP(req) {
//   const forwarded = req.headers['x-forwarded-for'];
//   return forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
// }

//Get producct with geoIP-based pricing
router.get('/:id', async (req, res) => {
  const ip = req.ip;
  console.log('Client IP:', ip);

  let currency = 'NGN'; // Default currency

  try {
    const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
    const countryCode = geo.data.country_code;

    if (countryCode === "CA") currency = "CAD";
    else if (countryCode === "NG") currency = "NGN";
    else console.log(`🌍 Defaulting to NGN for country: ${countryCode}`);
  } catch (error) {
    console.error("GeoIP lookup failed:", error.message);
  }

  try {
    const product = await productModel.findById(req.params.id);
    if (!product) { return res.status(404).json({ error: "Product not found" });
}

    const price = product.price?.[currency];
    if (!price) {
      return res
      .status(400)
      .json({ error: `Price not set for currency: ${currency}` });
    }

    res.json({
      id: product._id,
      name: product.name,
      price,
      currency,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;