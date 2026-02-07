import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../database/models/blog-post.model";

const gereateToken = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET as any, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = gereateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Failure", err);
    return res.status(500).json({ message: "Login Failure" });
  }
};

export const UserRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: "USER", // default
    });

    return res.status(201).json({
      message: "User created",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("register Failure", error);
    return res.status(500).json({ message: "register Failure" });
  }
};

export const UserValidation = async (req: Request, res: Response) => {
    const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenData = token.split(" ")[1];
    const user: any = jwt.verify(tokenData, process.env.JWT_SECRET as any);
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}