import userModel from '../models/userModel.js';
// import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "This account does not exist, please sign up." });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return user info (avoid returning password)
    return res.json({ id: user.id, name: user.fullName, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
    const { email, password, ...others} = req.body

// Validate required fields
  if (!email || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

//check if user exists in DB
  const isUser = await userModel.findOne({ email });

  //check if email and password exists
    if (isUser){
      return res.send("User already exists. Please login")
  };
  
//create a hashed password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

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
      return res.status(500).json({ message: 'something went wrong'});
    }
};

//Get user
export const getUser = async (req, res) => {
  const allUser = await userModel.find();
  return res.json(allUser);
};

//Update user
export const updateUser = async (req,res) => {
  const {id, ...others } = req.body
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      { ...others },
      { new: true }
      );
      return res.json(updateUser);
    } catch (error) {}
};
 
// Delete user
export const deleteUser = async (req, res) => {
   const { id } = req.query;
    try {
        const deletedUser = await userModel.findByIdAndDelete
        (id);
        return res.json(deletedUser);
    } catch (error) {} 
};