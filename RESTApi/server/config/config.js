import mongoose from "mongoose";
import env from "dotenv";

env.config()

const connection=()=>{
    mongoose.connect(process.env.MONGO_URI).then(
        ()=>{
            console.log("connection successfully established")
        }
    )
}

export default connection;