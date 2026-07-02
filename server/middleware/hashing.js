import bcrypt, { hash } from "bcrypt"

const hashing = async (req,res,next)=>{
    let account = req.body 
    const {password} = account
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    account = {...account,password:hashedPassword}
    req.account = account
    next()
}

export default hashing 