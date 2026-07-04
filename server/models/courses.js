import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
    weekNo: Number,
    title: String,
    videoa: Array,
    cheatsheets: Array,
    exams: Array,
    image:String
})

const Courses = mongoose.model("course", CourseSchema) 

export default Courses