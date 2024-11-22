import mongoose from "mongoose";

export const db = async(): Promise<void> =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL || '');
        console.log("Connected to MongoDB", conn.connection.host);
    } catch (error) {
       console.log(error);
    }
   
}