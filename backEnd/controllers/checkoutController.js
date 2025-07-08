import Product from "../models/productModel.js"

export const processCheckout = async (req, res) => {
const { products } = req.body;
  const { id } = req.user;

  if (!id) { return res.status(401).json({ message: "Unauthorized. Please sign in!" });}

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products selected for checkout." });
  }

  try {
    let totalAmount = 0;
    let validatedItems = [];

    for (const item of products) {
      const productDoc = await Product.findById(item.product);

      if (!productDoc) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
      }

      const quantity = item.quantity || 1;
      const price = productDoc.price;
      const itemTotal = price * quantity;

      validatedItems.push({
        product: productDoc._id,
        productName: productDoc.productName,
        quantity,
        price,
        itemTotal
      });

      totalAmount += itemTotal;
    }

    return res.status(200).json({
      success: true,
      message: "Checkout validated successfully.",
      summary: {
        items: validatedItems,
        totalAmount
      }
    });

  } catch (error) {
    console.error("Checkout processing error:", error);
    return res.status(500).json({ success: false, message: "Failed to process checkout." });
  }
};
