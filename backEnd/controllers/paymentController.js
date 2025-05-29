import Goods from '../models/productModel.js';

// Payment initiation (you already have this)
export const initiatePayment = async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod } = req.body;
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: customer.email,
        amount: Math.round(totalAmount * 100),
        metadata: {
          customer,
          items,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url } = response.data.data;
    res.status(200).json({ url: authorization_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};

// Update product by ID
export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Goods.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.adminId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(product, updates);
    await product.save();

    return res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product by ID
export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Goods.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.adminId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await product.remove();

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product' });
  }
};
