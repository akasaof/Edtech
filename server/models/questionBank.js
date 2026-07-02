import mongoose from "mongoose"



const QBSchema = new mongoose.Schema({
    week: Number,
    title: String,
    difficulty: String,
    status: String
})

const QuestionBank = mongoose.model("QB", QBSchema)

export default QuestionBank