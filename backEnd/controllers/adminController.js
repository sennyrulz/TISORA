import jwt from "jsonwebtoken"
import adminModel from '../models/adminModel.js';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const loginAdmin = async (req, res) => {
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
      return res.send("Invalid credentials" );
    }
//create a token
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

export const createAdmin = async (req, res) => {
    const { email, password, ...others } = req.body;

  //   if (!email || !password) {
  //   return res.status(400).json({ message: 'Email and password are required' });
  // }

// Validate required fields
    if(!fullName || !email || !phone || !address || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
//check if Admin exists in DB
  const existingAdmin = await adminModel.findOne({ email });
  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already exists. Please sign up." });
  }


    //create a hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // verify password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //continue with registration
    try {
      const newAdmin = new adminModel({   
        fullName,
        email,
        phone,
        address,
        password:hashedPassword,
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
    try {
      const allAdmin = await adminModel.find();
      return res.json(allAdmin);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve users" });
    }
  };

//Update admin
export const updateAdmin = async (req, res) => {
  const { _id, ...others } = req.body;
  try {
    const updateAdmin = await adminModel.findByIdAndUpdate(
      _id, 
      { ...others },
      { new: true }
      );
      return res.json(updateAdmin);
    } catch (error) {}
};
 
// Delete Admin
  export const deleteAdmin = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: 'ID is required' });

  Admin.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'Admin not found' });
      res.json({ message: 'Admin deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting Admin', error: err.message }));
  };