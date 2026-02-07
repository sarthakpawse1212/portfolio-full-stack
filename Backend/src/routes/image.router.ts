import express from "express";
import { upload } from "../utils/multer.util";
import { uploadImage } from "../controllers/upload.controller";

let router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);

export default router;