import mongoose from "mongoose";

const db = async()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/edtech")
        console.log("Connected Sucessfully")
    }
    catch{
        console.log("connection intrrupted")
    }
}

db()
export default db