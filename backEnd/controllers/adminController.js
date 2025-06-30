import jwt from "jsonwebtoken"
import adminModel from '../models/adminModel.js';
// import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  //validate user
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "This account does not exist, please create one." });
    };

  //compare password
    const isValid = bcrypt.compareSync(password, admin.password);
    if (!isValid) {
      return res.send("Invalid credentials" );
    }
//create a token
    const token = jwt.sign(
      { _id: user_id, admin:user.admin },
      process.env.SECRETKEY || 'my-secret-key-goes-here',
      { expiresIn: '1h' }
    );

    // Set token in HTTP-only cookie with secure flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60, // 1 hour
    });

      // Set token in HTTP-only cookie with secure flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      //process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60, // 1 hour
    });

  // Return user data without token
    return res.json({
      id: admin._id,
      name: admin.fullName,
      email: admin.email
    });
};

export const createAdmin = async (req, res) => {
  const { email, password, ...others } = req.body;

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
    const { _id } = req.user;
      const allAdmin = await adminModel
      .findById(_id)
      .populate("payments")
      .populate("orders")
      .populate("paymentss")
      return res.json(allAdmin);
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
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });

    }
};
 
// Delete Admin
  export const deleteAdmin = async (req, res) => {
    const { _id } = req.body;
    try {
      const deletedAdmin = await adminModel.findByIdAndDelete
        (_id);
        return res.json(deletedAdmin);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    } 
};