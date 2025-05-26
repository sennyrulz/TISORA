import userModel from '../models/userModel.js';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Login User
export const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
    
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }

};

export const createUser = async (req, res)=>{
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
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const isUser = await userModel.findOne({email});
     if (isUser){
        return res.send("User already exists. Please login")
     }
//check if user exists in DB
    try {
        const newUser = new userModel({   
            fullName,
            email,
            phone,
            address,
            password,});
        const savedUser = await newUser.save();
        return res.json(savedUser);    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

//Update admin
export const updateUser = async (req,res)=>{
    const {id, ...others } = req.body
    if (!id) return res.status(400).json({ message: 'ID is required' });
    
    User.findByIdAndUpdate(id, others, { new: true })

    .then(updated => {
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: 'Error updating user', error: err.message }));
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'ID is required' });

  User.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting user', error: err.message }));
};




// Register User
// export const registerUser = async (req, res) => {
//   const { fullName, email, phone, address, password } = req.body;

//   if (!fullName || !email || !phone || !address || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(409).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ fullName, email, phone, address, password: hashedPassword });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json({ message: "Error registering user", error: err.message });
//   }
// };



