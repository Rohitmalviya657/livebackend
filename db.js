// import mongoose from 'mongoose';
// export const connect = mongoose.connect("mongodb://localhost:27017/Codiant", {

// }).then(() => {
//     console.log("databse connected Succes");

// }).catch(() => {
//     console.log("something went rong");

// })

let isConnected = false;
export const connect = async function connectToMongoDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI, {

            useNewUrlParser: true,

            useUnifiedTopology: true

        });

        isConnected = true;

        console.log('Connected to MongoDB');

    } catch (error) {

        console.error('Error connecting to MongoDB:', error); I

    }

}