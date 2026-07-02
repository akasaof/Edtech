import Login from "../models/account.js";
import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    const { password, token } = req.body;
    console.log(password)
    console.log(token)
    const verification = jwt.verify(
        token,
        "Edtech123"
    )
    const { id } = verification
    Login.findById(id)
        .then((result) => {
            console.log("result", result)
            if (result.role === "Student") {
                if (result.Otp === Number(password)) {
                    req.status = true
                    next()
                }
                else {

                    req.status = false
                    next()
                }
            }
            else {
                if (result.password === password) {
                    req.status = true
                    next()
                }
                else {

                    req.status = false
                    next()
                }
            }

        })
}

export default auth