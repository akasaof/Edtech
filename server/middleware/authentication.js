import jwt from "jsonwebtoken"
import Login from "../models/account.js"

const authentication = async (req,res,next)=>{
        const jwtToken = req.headers.authorization
        const token = jwtToken.split(" ")[1]
        const result = jwt.verify(
            token,"Edtech123"
        )
        const account = await Login.findById(result.id)
        req.role = account.role
        next()
}

export default authentication