import adminModel from '../models/adminModel.js';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

     const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = await adminModel.findOne({email});
     if (isAdmin){
        return res.send("Admin already exists. Please login")
     }

    const token = jwt.sign(
      { id: admin._id, email: admin.email }, 
      process.env.SECRETKEY, 
      {expiresIn: "1h",
    });
    return res.json({ token });
    
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }

};

export const createAdmin = async (req, res)=>{
    const {
    fullName,
    email,
    phone,
    address,
    password} = req.body

// Validate required fields
    if (!fullName || !email || !phone || !address || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
   
//check if Admin exists in DB
    try {
        const newAdmin = new adminModel({   
            fullName,
            email,
            phone,
            address,
            password,});
        const savedAdmin = await newAdmin.save();
        return res.json(savedAdmin);    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating Admin', error: err.message });
    }
};

//Update admin
export const updateAdmin = async (req,res)=>{
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