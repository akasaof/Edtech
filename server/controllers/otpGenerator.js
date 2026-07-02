import Login from "../models/account.js"
import jwt from "jsonwebtoken"


const otp = async (user)=>{
     if (user.role === "Student") {
            const otp = Math.ceil(1000 + Math.random() * 100)
            const id = user._id
            await Login.findByIdAndUpdate(id, { Otp: otp })
            const token = jwt.sign(
                { id: user._id },
                "Edtech123",
                { expiresIn: "1d" }
            )
            const result = await Login.findById(id)
            return {result,token}
        }
        else {
            const id = user._id
            const token = jwt.sign(
                { id: user._id },
                "Edtech123",
                { expiresIn: "1d" }
            )
            const result = await Login.findById(id)
            return {result,token}
        }
}
export default otp