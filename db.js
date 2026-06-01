import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
    if (cached.conn) return cached.conn;

    try {
        if (!cached.promise) {
            cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
        }

        cached.conn = await cached.promise;
        return cached.conn;
    } catch (err) {
        console.log("MongoDB Connection Error:", err);
    }
};