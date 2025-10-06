import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
// import Token from '../models/token.js';
// import sendEmail from '../utils/sendEmail.js';
// import crypto from 'crypto';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

// Validate user
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ 
      success:false, 
      message: "This account does not exist, please sign up" 
    });
  };

// Compare password
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid email or password" 
    });
  }

// Create a token
  const token = jwt.sign(
    { id:user._id, admin:user.admin },
    process.env.SECRETKEY,
    { expiresIn: '7d' });

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,   
    maxAge: 7 * 24 * 60 * 60  *1000, //  7 Days
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
    id: user._id,
    name: user.fullName,
    email: user.email
    }
  });
};

// Create/Register User
export const createUser = async (req, res) => {
  const { fullName, email, phone, address, password} = req.body;

//verify Email and password exists
  if (!fullName || !email || !phone || !address || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
//check if user exists in DB
  const isUser = await userModel.findOne({email});
  if (isUser) {
    return res.status(400).json({ message: "User already exists. Please login." });
  };

//create a hashed password
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);
  // console.log(hashedPassword);

//create a new user
  try {
    const newUser = new userModel({
      fullName,
      email,
      phone,
      address,
      password,
    });

//Save to DB
    const savedUser = await newUser.save();
      return res.json(savedUser);  

  } catch (error) {
      console.log(error.message);
      return res.send("something went wrong");
  }
};

export const getAllUser = async (req, res) => {
  try {
    const getAllUsers = await userModel.find()
      .populate("payments", "orders, items");

      return res.status(200).json({
        success: true,
        users: getAllUsers
      });

  } catch (error) {
    return res.send ("error")
  }
}

// Get Users
export const getUser = async (req, res) => {
  const { _id } = req.user;
  const user = await userModel
    .findById(_id)
    .populate({
      path: "orders",
      populate: {
      path: "items.product", 
      model: "Product",
    },
  })
    .populate("payments")
    .populate("checkout");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  return res.json(user);
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phone, address, password },
      { new: true }
      )
      .select("-password");
      
      if (!updatedUser) {
        return res.status(404).json({success: false, message: "User not found" });
      }

      res.status(200).json({success: true, message: "User updated successfully", user });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
  const {_id } = req.query;
  try {
    const deletedUser = await userModel.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

      res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Deletion failed" });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (!decoded.user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await userModel.findById(decoded.id).select("fullName email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.fullName,
      email: user.email,
      user: true,
    });
  } catch (err) {
    console.error("❌ verifyUser error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  console.log("🍪 Token from cookie:", req.cookies.token);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await userModel.findById(decoded.id || decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user.id,
      name: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
