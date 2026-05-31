import mongoose from "mongoose";

const Schemma = mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    image: { type: String }
})


export const User = mongoose.model("Coadiant", Schemma);