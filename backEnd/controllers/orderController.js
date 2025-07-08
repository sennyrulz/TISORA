import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// 🛒 CREATE ORDER
export const createOrder = async (req, res) => {
  console.log("🛒 createOrder called:", req.body);

  const { products, totalAmount, paymentStatus } = req.body;
  const { id } = req.user;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided." });
  }

  try {
    const newOrder = new Order({
      user: id,
      items: products.map(p => ({
        product: p.product, 
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount,
      status: paymentStatus?.toLowerCase() || "pending",
    });
    const savedOrder = await newOrder.save().catch(err => {
       console.error("❌ Failed to save order:", err.message);
      throw err;
    });
    console.log("✅ Order saved:", savedOrder);


    await User.findByIdAndUpdate(
      id,
      { $push: { orders: savedOrder._id } },
      { new: true }
    );

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// 👤 GET USER ORDERS
export const getMyOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id })
      .populate("items.product", "productName price")
      .sort({ createdAt: -1 })
      .lean();

    const normalizedOrders = orders.map(order => {
      order.items = order.items.map(item => ({
        ...item,
        productName: item.product?.productName || 'N/A',
        price: item.product?.price || 0,
      }));
      return order;
    });

    return res.json({ success: true, data: normalizedOrders });
  } catch (err) {
    console.error("Fetch user orders error:", err);
    return res.status(500).json({ success: false, message: "Failed to get your orders." });
  }
};

// 🛠️ ADMIN: GET ALL ORDERS (Optional)
export const getAdminOrders = async (req, res) => {
  const { adminId } = req.query;

  try {
    const orders = await Order.find({ user: adminId })
      .populate("items.product", "productName price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("Fetch admin orders error:", err);
    return res.status(500).json({ success: false, message: "Failed to get admin orders." });
  }
};
