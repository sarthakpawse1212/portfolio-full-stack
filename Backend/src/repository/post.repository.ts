import { IBlogPost, postModel } from "../database/models/blog-post.model";
import { Types } from "mongoose";

// CREATE POST
export async function createPostRepo(payload: IBlogPost) {
  const post = new postModel(payload);
  return await post.save();
}

// GET ALL POSTS (Pagination + Search optional)
export async function getAllPostsRepo(page: number, limit: number, search?: string) {
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const posts = await postModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const total = await postModel.countDocuments(filter);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: posts,
  };
}

// GET BY ID
export async function getPostByIdRepo(id: string) {
  if (!Types.ObjectId.isValid(id)) return null;
  return await postModel.findById(id);
}

// UPDATE
export async function updatePostRepo(id: string, payload: Partial<IBlogPost>) {
  return await postModel.findByIdAndUpdate(id, payload, { new: true });
}

// DELETE
export async function deletePostRepo(id: string) {
  return await postModel.findByIdAndDelete(id);
}