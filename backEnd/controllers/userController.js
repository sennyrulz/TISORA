import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
// import Token from '../models/token.js';
// import sendEmail from '../utils/sendEmail.js';
// import crypto from 'crypto';


// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validate user    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "This account does not exist, please sign up" });
    };

  //compare password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.send("Invalid credentials!!" );
    }
//create a token
    const token = jwt.sign(
      { _id: user._id, admin:user.admin },
      process.env.SECRETKEY || 'my-secret-key-goes-here',
      { expiresIn: '1h' }
    );

    // Set token in HTTP-only cookie with secure flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production', // only true in prod
      sameSite: 'lax', // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    // Return user data without token
    console.log("✅ User found:", user._id);
    return res.json({
      id: user._id,
      name: user.fullName,
      email: user.email
    });
};

// Create/Register User
export const createUser = async (req, res) => {
  const { email, password, ...others } = req.body;

//verify Email and password exists
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

//check if user exists in DB
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return res.status(409).json({ message: "User already exists. Please login." });
  };

//create a hashed password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

// // verify password
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     return res.status(401).json({ message: "Invalid password" });
//   } //use this for validateUSer

//continue with registration
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
  const { _id } = req.user;
    const allUsers = await userModel
    .findById(_id)
    .populate("payments")
    .populate("orders")
    .populate("paymentss")
    return res.json(allUsers);
};

// Update User
export const updateUser = async (req, res) => {
  const { _id, ...others } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id, 
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
  const { _id } = req.query;
  try {
    const deletedUser = await userModel.findByIdAndDelete
    (_id);
    return res.json(deletedUser);
  } catch (error) {
    return res.status(500).json({ message: "Deletion failed" });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params._id);
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }

    const token = await token.findOne({
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
