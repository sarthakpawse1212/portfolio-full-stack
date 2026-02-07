import { Request, Response } from "express";
import * as postService from "../services/post.service";

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPostService(req.body);
    return res.status(201).json({ message: "Post created", data: post });
  } catch (err) {
    console.error("createPost error:", err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

// GET ALL POSTS (pagination)
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 3);
    const search = req.query.search as string;

    const result = await postService.getAllPostsService(page, limit, search);
    return res.json(result);
  } catch (err) {
    console.error("getAllPosts error:", err);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// GET SINGLE POST
export const getPostById = async (req: Request, res: Response) => {
  try {
    let postId: any = req.params.id;
    const post = await postService.getPostByIdService(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.json(post);
  } catch (err) {
    console.error("getPostById error:", err);
    return res.status(500).json({ message: "Failed to fetch post" });
  }
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    let postId: any = req.params.id;
    const post = await postService.updatePostService(postId, req.body);
    return res.json({ message: "Post updated", data: post });
  } catch (err) {
    console.error("updatePost error:", err);
    return res.status(500).json({ message: "Failed to update post" });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    let postId: any = req.params.id;
    await postService.deletePostService(postId);
    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};