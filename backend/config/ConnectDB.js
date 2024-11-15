import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully!");
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectDB;