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
    return res.status(404).json({ message: "This account does not exist, please sign up" });
  };
// Compare password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
// Create a token
  const token = jwt.sign(
    { id:user.id, admin:user.admin },
    process.env.SECRETKEY,
    { expiresIn: '1h' }
  );

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    //  secure: true, 
    secure: process.env.NODE_ENV === "production",    
    sameSite: 'lax',
    maxAge: 24 * 60 * 60  *1000, // 1 Day
  });

  // Return user data
  console.log("✅ User found:", user.id);
  return res.json({
    id: user.id,
    name: user.fullName,
    email: user.email
  });
};

// Create/Register User
export const createUser = async (req, res) => {
  const { fullName, phone, address, email, password} = req.body;

//verify Email and password exists
  if (!fullName, !phone, !address, !email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
//check if user exists in DB
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return res.status(409).json({ message: "User already exists. Please login." });
  };

//create a hashed password
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);
  // console.log(hashedPassword);

//continue with registration
  try {
    const newUser = new userModel({
      fullName,
      email,
      phone,
      address,
      password,
    });
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
      return res.json(getAllUsers)

  } catch (error) {
    return res.send ("error")
  }
}

// Get Users
export const getUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel
      .findById(id)
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
  } catch (error) {
    console.error("❌ getUser error:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
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
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
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
