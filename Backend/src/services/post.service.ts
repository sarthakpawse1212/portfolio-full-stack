import * as repo from "../repository/post.repository";

// CREATE
export const createPostService = async (payload: any) => {
  return await repo.createPostRepo(payload);
};

// GET ALL
export const getAllPostsService = async (page: number, limit: number, search?: string) => {
  return await repo.getAllPostsRepo(page, limit, search);
};

// GET BY ID
export const getPostByIdService = async (id: string) => {
  return await repo.getPostByIdRepo(id);
};

// UPDATE
export const updatePostService = async (id: string, payload: any) => {
  return await repo.updatePostRepo(id, payload);
};

// DELETE
export const deletePostService = async (id: string) => {
  return await repo.deletePostRepo(id);
};