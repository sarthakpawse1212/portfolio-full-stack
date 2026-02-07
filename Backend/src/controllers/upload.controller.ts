// controllers/upload.controller.ts
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary.util";
import fs from "fs";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    let result;

    // File uploaded from device
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio-blog",
      });

      // delete temp file
      fs.unlinkSync(req.file.path);
    }

    // Image URL provided
    else if (req.body.imageUrl) {
      result = await cloudinary.uploader.upload(req.body.imageUrl, {
        folder: "portfolio-blog",
      });
    }

    else {
      return res.status(400).json({ error: "No image provided" });
    }

    return res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};