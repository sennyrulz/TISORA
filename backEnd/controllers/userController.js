import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt for email:", email);
    
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "This account does not exist, please create one." });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRETKEY || 'my-secret-key-goes-here',
      { expiresIn: '1h' }
    );

    // Set token in HTTP-only cookie with secure flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    // Return user data without token
    return res.json({
      id: user._id,
      name: user.fullName,
      email: user.email
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Create/Register User
export const createUser = async (req, res) => {
  const { email, password, ...others } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists. Please log in." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  try {
    const newUser = new userModel({
      email,
      password: hashedPassword,
      ...others,
    });
    const savedUser = await newUser.save();
        return res.json(savedUser);    
    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong");
    }
};

// Get All Users
export const getUser = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    return res.json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id, ...others } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id, 
      { ...others },
      { new: true }
      );
      return res.json(updateUser);
    } catch (error) {}
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    const deletedUser = await userModel.findByIdAndDelete
    (id);
    return res.json(deletedUser);
  } catch (error) {
    return res.status(500).json({ message: "Deletion failed" });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await userModel.findByIdAndUpdate(user._id, { verified: true });
    await token.deleteOne();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
