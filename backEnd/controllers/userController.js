import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "This account does not exist, please create one." });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({ id: user._id, name: user.fullName, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
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

  const newUser = new userModel({
    email,
    password: hashedPassword,
    ...others,
  });

  try {
    const savedUser = await newUser.save();

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex")
    }).save();

    const url = `${process.env.VITE_BACKEND_URL}user/${savedUser._id}/verify/${token.token}`;
    await sendEmail(savedUser.email, "Verify Email", url);

    return res.status(201).json({ message: "An email has been sent to your account, please verify." });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({ message: 'Something went wrong' });
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
    const updatedUser = await userModel.findByIdAndUpdate(id, others, { new: true });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Update failed" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
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
