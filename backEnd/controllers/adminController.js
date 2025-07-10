import jwt from "jsonwebtoken"
import adminModel from '../models/adminModel.js';
import bcrypt from 'bcrypt';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate admin
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "This account does not exist, please create one." });
    }

    // Compare password
    const isValid = bcrypt.compareSync(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" }); // ✅ Use proper status
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, admin: true },
      process.env.SECRETKEY,
      { expiresIn: '1h' }
    );

    // Set cookie securely
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ Only secure in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Respond with admin info
    console.log("✅ Admin logged in:", admin.id);
    return res.status(200).json({
      id: admin.id,
      name: admin.fullName,
      email: admin.email,
      admin: true,
      token,
    });
  } catch (error) {
    console.error("❌ Admin login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;

// Validate required fields
  if(!fullName || !email || !phone || !address || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
//check if Admin exists in DB
  const isAdmin = await adminModel.findOne({ email });
  if (isAdmin) {
    return res.status(409).json({ message: "Admin already exists. Please sign up." });
  }

  //continue with registration
    try {
      const newAdmin = new adminModel({   
        fullName,
        email,
        phone,
        address,
        password,
        admin:true,
      });
      const savedAdmin = await newAdmin.save();
        return res.json(savedAdmin);    
    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong");    
    }
  };

//Get admin
  export const getAdmin = async (req, res) => {
    const { id } = req.admin;
      try {
    const admin = await adminModel
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

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json(admin);
  } catch (error) {
    console.error("❌ getAdmin error:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//Update admin
export const updateAdmin = async (req, res) => {
  const { id, ...others } = req.body;
  try {
    const updateAdmin = await adminModel.findByIdAndUpdate(
      id, 
      { ...others },
      { new: true }
      );
      return res.json(updateAdmin);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
 
// Delete Admin
  export const deleteAdmin = async (req, res) => {
    const { id } = req.query;
    try {
      const deletedAdmin = await adminModel.findByIdAndDelete
        (id);
        return res.json(deletedAdmin);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    } 
};

// Verify Admin
export const verifyAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (!decoded.admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const admin = await adminModel.findById(decoded.id).select("fullName email");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      id: admin._id,
      name: admin.fullName,
      email: admin.email,
      admin: true,
    });
  } catch (err) {
    console.error("❌ verifyAdmin error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCurrentAdmin = async (req, res) => {
  console.log("🍪 Token from cookie:", req.cookies.token);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const admin = await adminModel.findById(decoded.id || decoded._id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json({
      id: admin.id,
      name: admin.fullName,
      email: admin.email,
    });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
