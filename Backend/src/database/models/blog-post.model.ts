import mongoose, { Schema, Document } from "mongoose";

// Blog Document Interface
export interface IBlogPost extends Document {
  banner: string;
  title: string;
  content: {
    blocks: any[]; // dynamic editor.js blocks
  };
  date: Date;
  category: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Document Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    banner: {
      type: String,
      required: [true, "Banner image is required"],
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    content: {
      blocks: {
        type: [Schema.Types.Mixed], // ✅ dynamic JSON structure
        required: [true, "Content blocks are required"],
        default: [],
      },
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true, // useful for filtering blogs
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto
    versionKey: false,
  }
);

export const postModel = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model<IUser>("User", UserSchema);