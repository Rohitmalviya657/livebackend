import express from 'express';
import { connect } from './db.js';
import cors from 'cors';
import router from './routers.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use('/my-uploads', express.static('my-uploads'));

app.use("/user", router);
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
// app.listen(5000, () => {
//     console.log("Server started successfully on port 5000");
// });
export default app