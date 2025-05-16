import User from "../models/userModel.js";
import Goods from "./productModel.js";

export const updateRegisterUser = async (req, res) => {
    try {
        const { role } = req.body; // Get the new role from request body

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        user.role = role; // Change the user role
        await user.save();

        res.status(200).json({ message: "User role updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a user from the database
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successsfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get one user from the database
export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get all users from the database
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get one product from the database
export const getOneProduct = async (req, res) => {
    try {
        const good = await Goods.findById(req.params.id);
        if (!good) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(good);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get all products from the database
export const getAllProducts = async (req, res) => {
    try {
        const goods = await Goods.find();
        res.status(200).json(goods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    } 
}

// Create a new product 
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Product Created successfully", product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get all products by one vendor
export const getProductsByVendor = async (req, res) => {
    try {
        const products = await Goods.find({ vendorId: req.params.vendorId });
        if (!products) return res.status(404).json({ message: "No products found for this vendor" });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get one product by one vendor
export const getOneProductByVendor = async (req, res) => {
    try {
        const product = await Goods.findOne({ _id: req.params.productId, vendorId: req.params.vendorId });
        if (!product) return res.status(404).json({ message: "Product not found for this vendor" });
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}