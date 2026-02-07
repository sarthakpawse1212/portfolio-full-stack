import dotenv from "dotenv";
dotenv.config();
const { DB_URL } = process.env;
import mongoose from "mongoose";

 export const connection = async() => {
    try {
        mongoose.connect( DB_URL || 'mongodb://localhost:27017/blogs', {
            autoIndex: false,
        });
        console.log('Mongo connected success')
    } catch (error) {
        console.log('Mongo connection error', error);
    }
} 


