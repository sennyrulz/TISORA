import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const tisora = express()
dotenv.config();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
tisora.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',
      },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ url: result.secure_url });
      });

    result.end(req.file.buffer);
    
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }});

  tisora.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

// const students = [
//   {id:1, name: "Oluwaseun", email:"oluwaseun.oloto@gmail.com", password:"11111"},
//   {id:2, name: "Olayinka", email:"olayinka.oloto@gmail.com", password:"11111"},
//   {id:3, name: "Olatunji oluyide", email:"olatunji.oluyide@gmail.com", password:"11111"}
// ]
// app.post("/", (req, res)=>{
//   const payload = req.body;
//   console.log(payload)
//   const newPayload = {id:students.length+1, ...payload}
//   students.push(newPayload)
//   return res.send("registration was sucessful!!")
// })

// app.get("/", (req, res)=>{
//   return res.json(students)
// })

// app.put("/", (req,res)=>{
//   const payload = req.body;
//   const userPosition = students.findIndex((student)=> student.id == payload.id)
//   // const studentPosition = students.findIndex((students)=> students.email == payload.email)
//   students.splice(userPosition, 1, payload)
//   // console.log(studentPosition)
//   return res.send("Your information is updated successfully")
// })
// app.delete("/", (req, res)=>{
//   return("this is a delete request")
// })


