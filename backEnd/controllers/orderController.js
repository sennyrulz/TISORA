import Order from "../models/orderModel.js"; // Adjust path as needed
import Product from "../models/productModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    const body = req.body;
    const {_id} = req.user;
    console.log(req.user)
  try {
    const { products, totalAmount } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided." });
    }

    const order = await new orderModel({
      user: _id,
      products,
      totalAmount,
      paymentStatus: "Paid", // you can change based on Paystack webhook
    });

    const savedOrder = await newOrder.save()
    return res.json(savedOrder);
  } catch (error) {
    console.log("Create order error:");
    return res.status(500).json({ message: "Server error creating order." });
  }
};

// Get orders for the authenticated user
export const getMyOrders = async (req, res) => {
  const {orderId} = req.query
  try {
    const orders = await orderModel.find({ user: orderId })
      .populate("products.product", "productName price") // only selected fields
      .sort({ createdAt: -1 });

    return res.status(200).json(orders); // return as array
  } catch (err) {
    console.error("Fetch user orders error:", err);
    return res.status(500).json({ message: "Failed to get your orders." });
  }
};

// (Optional) Get all orders (for admin)
export const getAdminOrders = async (req, res) => {
const {orderId} = req.query
  try {
    const orders = await orderModel.find({ user: orderId })
      .populate("products.product", "productName price") // only selected fields
      .sort({ createdAt: -1 });

    return res.status(200).json(orders); // return as array
  } catch (err) {
    console.error("Fetch user orders error:", err);
    return res.status(500).json({ message: "Failed to get your orders." });
  }
};
