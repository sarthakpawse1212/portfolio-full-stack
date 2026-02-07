import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getAllPosts); // ?page=1&limit=10&search=backend
router.get("/post/:id", getPostById);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;