import multer from "multer";

const storage = multer.memoryStorage(); // Storing in memory for direct upload to Cloudinary
const upload = multer({ storage });

export default upload;
