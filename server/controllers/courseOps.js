import Courses from "../models/courses.js"


const adminCourseOps = async (arg) => {
    try {
        const { operation, data } = arg
        if (operation === "get") {
            const courses = await Courses.find()
            return courses
        }
        else if (operation === "create") {
            await Courses.insertOne(data)
            return "Added Sucessfully"
        }
        else if (operation === "delete") {
            const { id } = data
            await Courses.findByIdAndDelete(id)
            return "Course Deleted Sucessfully"
        }
        else if (operation === "update") {
            const { id, changes } = data
            console.log(id)
            console.log(changes)
            await Courses.findByIdAndUpdate(id, changes)
            return "Course Updated Sucessfully"
        }
        else {
            return "Invalid Operation"
        }

    }
    catch {
        return new Error("Something went wrong")
    }


}

export default adminCourseOps