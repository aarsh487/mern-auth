import mongoose from "mongoose"
import { MONGO_URI } from "../utils/config";

export const connectDb = async() => {
    try {
        mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log("Error while connnecting database", error);
        process.exit(1);        
    }
};