// import mongoose from 'mongoose';
// export const connect = mongoose.connect("mongodb://localhost:27017/Codiant", {

// }).then(() => {
//     console.log("databse connected Succes");

// }).catch(() => {
//     console.log("something went rong");

// })

let isConnected = false;
import mongoose from "mongoose";

export const connect = async () => {
    try {
        console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Error:", error);
    }
};