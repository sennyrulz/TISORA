import userModel from '../models/userModel.js';
// import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import Token from '../models/token.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
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
      let token = await Token.findOne({userId:user.id});
      if (!token){
        token = await new Token({
          userId: user.id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
          const url = `${process.env.VITE_BACKEND_URL}user/${user.id}/verify/${token.token}`
          await sendEmail(user.email,"Verify Email", url);
      return res.status(401).json({ message: "Email has been sent to your account, please verify!" })
      }
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

  //generate token
  const token = await new Token({
    id: user.id,
    token:crypto.randomBytes(32).toString("hex")
  }).save();
  const url = `${process.env.VITE_BACKEND_URL}user/${user.id}/verify/${token.token}`
  await sendEmail(user.email,"Verify Email", url);


  res.status(201).send({message:"An email has been sent to your account, Please verify!"})
    
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

export const verifyUser = async (req, res) => {
  try {
    const user = await user.findOne({id:req.params.id});
    if(!user) {
      return res.status(400).send({message:"Invalid link"})
    };

    const token = await Token.findOne({
      userid: user.id,
      token:req.params.token
    });

    if(!token) {
      return res.status(400).send({message:"invalid link"})
    };

    await user.updateOne({id:user.id, verified:true});
    await token.remove()

    res.status(200).send({message:"Email verified successfully"})
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong'})
  };
}