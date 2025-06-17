import Order from "../models/orderModel.js"; // Adjust path as needed
import Product from "../models/productModel.js";

// Create a new order
export const createOrder = async (req, res) => {
   const body = req.body;
    const {userId} = req.cookies
  try {
    const { products, totalAmount } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided." });
    }

    const order = await Order.create({
      user: req.user._id, // from auth middleware
      products,
      totalAmount,
      paymentStatus: "Paid", // you can change based on Paystack webhook
    });

    return res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ message: "Server error creating order." });
  }
};

// Get orders for the authenticated user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "productName price") // only selected fields
      .sort({ createdAt: -1 });

    return res.status(200).json(orders); // return as array
  } catch (err) {
    console.error("Fetch user orders error:", err);
    return res.status(500).json({ message: "Failed to get your orders." });
  }
};

// (Optional) Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "productName price")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch all orders error:", err);
    return res.status(500).json({ message: "Failed to get all orders." });
  }
};
