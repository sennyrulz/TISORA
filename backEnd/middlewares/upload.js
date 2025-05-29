import multer from "multer";

const storage = multer.memoryStorage(); // store file buffer in memory
const upload = multer({ storage });

export default upload;
