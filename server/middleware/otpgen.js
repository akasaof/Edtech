import Login from "../models/account.js"

const otpGen = (req, res, next) => {
    const { number } = req.body
    console.log(number)
    Login.findOne({ phone: Number(number) })
        .then((result) => {
            console.log(result)
            req.user = result
            next()
        })

}

export default otpGen