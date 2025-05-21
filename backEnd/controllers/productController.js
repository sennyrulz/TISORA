const Goods = require('../models/productModel.js');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Goods.find().populate('adminId', 'fullname email');
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Create a new product
const createProducts = async (req, res) => {
    const {
        productName,
        desc,
        features,
        materials,
        sizes,
        price,
        pictures
    } = req.body;

    // Validate required fields
    if (!productName || !desc || !features || !materials || !sizes || !price || !pictures) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate that at least two images were uploaded
    if (!Array.isArray(pictures) || pictures.length < 2) {
        return res.status(400).json({ message: 'At least two images are required' });
    }

    try {
        const newProduct = new Goods({
            adminId: req.user.userId, // from JWT middleware
            productName,
            desc,
            features,
            materials,
            sizes,
            price,
            pictures // Expecting Cloudinary image array
        });

        await newProduct.save();

        return res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: 'Failed to create product' });
    }
};

// Update an existing product
const updateProducts = async (req, res) => {
    const { id, ...updates } = req.body;

    try {
        const updatedProduct = await Goods.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: 'Failed to update product' });
    }
};

// Delete a product
const deleteProducts = async (req, res) => {
    const { id } = req.body;

    try {
        const deleted = await Goods.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: 'Failed to delete product' });
    }
};

module.exports = {getProducts, createProducts, updateProducts, deleteProducts};
