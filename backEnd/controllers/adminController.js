import adminModel from '../models/adminModel.js';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "This account does not exist, please sign up." });
    }

    const isValid = bcrypt.compareSync(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return admin info (avoid returning password)
    return res.json({ id: user.id, name: user.fullName, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const createAdmin = async (req, res) => {
    const {
    fullName,
    email,
    phone,
    address,
    password} = req.body

// Validate required fields
    if(!fullName || !email || !phone || !address || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
//check if Admin exists in DB
    const isAdmin = await adminModel.findOne({email});
    if(isAdmin){
      return res.send("Admin already exists. Please log in")
    };

    //create a hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    //continue with registration
    try {
      const newAdmin = new adminModel({   
        fullName,
        email,
        phone,
        address,
        password:hashedPassword});
      const savedAdmin = await newAdmin.save();
      return res.json(savedAdmin);    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error creating Admin', error: err.message });
    }
  };

//Get admin
  export const getAdmin = async (req, res) => {
    const allAdmin = await adminModel.find();
    return res.json(allAdmin);
  };

//Update admin
  export const updateAdmin = async (req,res) => {
    const {id, ...others } = req.body
    if (!id) return res.status(400).json({ message: 'ID is required' });
    
    Admin.findByIdAndUpdate(id, others, { new: true })

  .then(updated => {
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.json(updated);
  })
  .catch(err => res.status(500).json({ message: 'Error updating Admin', error: err.message }));
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