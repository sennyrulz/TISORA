import Goods from '../models/productModel.js';

export const products = async (req, res) => {
    try {
        const { productName, desc, price } = req.body;

        // Validate required fields
        if (!productName || !desc || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        // Process uploaded images from Cloudinary
        const pictures = req.files.map((file) => ({
            url: file.path,
            size: file.size,
            publicId: file.filename,
        }));

        // Create new product
        const product = new Goods({
            productName,
            desc,
            price,
            userId: req.user.userId, // Assuming userId comes from authentication middleware
            pictures,
        });

        console.log('Creating product:', product);
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
