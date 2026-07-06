import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


import Courses from "./models/courses.js"
import QuestionBank from "./models/questionBank.js"
import jobBoard from "./models/jobBoard.js"
import db from "./config/dbconfig.js"


import otpGen from "./middleware/otpgen.js"
import auth from "./middleware/auth.js"
import authentication from "./middleware/authentication.js"
import upload from "./uploads.js"


import otp from "./controllers/otpGenerator.js"
import filter from "./controllers/QBfilter.js"
import adminCourseOps from "./controllers/courseOps.js"
import adminUserOps from "./controllers/userOps.js"
import hashing from "./middleware/hashing.js"
import adminQbOps from "./controllers/qbOps.js"
import adminJobsOps from "./controllers/jobBoardOps.js"


db()

const server1 = express()
server1.use(cors())
server1.use(express.json())

server1.post("/otp", otpGen, async (req, res) => {
    try {
        const user = req.user
        const result = await otp(user)
        res.json(result)
    }
    catch{
        res.send("This phone number dosen't havn an account")
    }
    
})

server1.post("/login", auth, (req, res) => {
    const status = req.status
    console.log("status", status)
    res.json(status)
})

server1.get("/getData/:week", (req, res) => {
    console.log("Got request")
    const week = req.params.week.split("-")
    console.log(week[1])
    Courses.find({ weekNo: week[1] })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
})

server1.get('/getData', (req, res) => {
    console.log("Got request")
    Courses.find()
        .then((result) => {
            res.json(result)
        })
})

server1.get("/getqb", (req, res) => {
    QuestionBank.find()
        .then((result) => {
            res.json(result)
        })
})

server1.post("/getfilterqb", async (req, res) => {
    const result = await filter(req.body)
    console.log(result)
    res.json(result);
})

server1.get("/jobBoard", async (req, res) => {
    const jobs = await jobBoard.find()
    res.json({ jobs })
})



// --------------------Admin-----------------

server1.post("/course/:operation", authentication, async (req, res) => {
    if (req.role === "Admin") {
        const operation = req.params.operation
        const data = req.body
        const result = await adminCourseOps({ operation, data })
        res.json({ result })
    }
    else {
        res.status(400)
        res.send("Acess Denied")
    }
})

server1.post("/User/:operation", authentication, async (req, res) => {
    if (req.role === "Admin") {
        const operation = req.params.operation
        const data = req.body
        console.log(data)
        const result = await adminUserOps({ operation, data })
        res.json({ result })
    }
    else {
        res.status(400)
        res.send("Acess Denied")
    }
})

server1.post("/Admincourse/:operation",authentication,async (req, res) => {
    if (req.role === "Admin") {
        const operation = req.params.operation
        const data = req.body
        const result = await adminCourseOps({ operation, data })
        res.json({ result })
    }
    else {
        res.status(400)
        res.send("Acess Denied")
    }
})

server1.post("/Qb/:operation", authentication, async (req, res) => {
    if (req.role === "Admin") {
        const operation = req.params.operation
        const data = req.body
        console.log(data)
        const result = await adminQbOps({ operation, data })
        res.json({ result })
    }
    else {
        res.status(400)
        res.send("Acess Denied")
    }
})

server1.post("/JobBoard/:operation", authentication, async (req, res) => {
    if (req.role === "Admin") {
        const operation = req.params.operation
        const data = req.body
        const result = await adminJobsOps({ operation, data })
        res.json({ result })
    }
    else {
        res.status(400)
        res.send("Acess Denied")
    }
})

server1.use("/uploads", express.static("uploads"))

server1.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const id = req.body.id
        console.log(id)
        console.log(req.file.filename)
        await Courses.findByIdAndUpdate(id, { image: req.file.filename })
        res.send("Uploaded")
    }
    catch {
        console.log("error")
    }
})

server1.listen(process.env.port, () => {
    console.log("Server is running")
})

