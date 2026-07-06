import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config("../")



const db = async()=>{
    try{
        mongoose.connect(process.env.url)
        console.log("Connected Sucessfully")
    }
    catch{
        console.log("connection intrrupted")
    }
}

db()
export default db