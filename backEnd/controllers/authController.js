import bcrypt from "bcryptjs"; 
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('No user found');

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send('Invalid username or password') 

            const token = jwt.sign({userId: user._id, username: user.fullName, role: user.role}, process.env.SECRETKEY);
            res.header('Authorization', `Bearer ${token}`).send(token);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body); // Debugging: Check incoming request data

        const { fullName, email, password, address, phone } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ 
            fullName, email, phone, address,
            password: hashedPassword
        });

        await user.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};