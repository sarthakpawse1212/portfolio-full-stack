// middleware/multer.ts
import multer from "multer";

const storage = multer.diskStorage({
destination: "uploads/", // temp local folder
filename: (req, file, cb) => {
cb(null, Date.now() + "-" + file.originalname);
},
});

export const upload = multer({ storage });