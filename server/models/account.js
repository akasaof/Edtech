import mongoose from "mongoose";

const Accschema = new mongoose.Schema({
    phone: Number,
    name: String,
    role: String,
    Fees: String,
    Otp: Number,
    password: String
})

const Login = mongoose.model("Account", Accschema) 

export default Login