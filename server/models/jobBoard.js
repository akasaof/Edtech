import mongoose from "mongoose"

const jobBoardSchema = new mongoose.Schema({
    jobTitle: {
        type: String
    },
    jobDesc: {
        type: String
    },
    jobComp: {
        type: String
    },
    count: {
        type: Number
    }
})
const jobBoard = mongoose.model("job", jobBoardSchema)

export default jobBoard