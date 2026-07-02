import Login from "../models/account.js";

const adminUserOps = async (arg) => {
    try {
        const { operation,data } = arg
        if (operation === "get") {
            const users = await Login.find()
            return users
        }
        else if (operation === "create") {
            await Login.insertOne(data)
            return "Added Sucessfully"
        }
        // else if (operation === "delete") {
        //     const { id } = data
        //     await Courses.findByIdAndDelete(id)
        //     return "Course Deleted Sucessfully"
        // }
        // else if (operation === "update") {
        //     const { id, changes } = data
        //     console.log(id)
        //     console.log(changes)
        //     await Courses.findByIdAndUpdate(id, changes)
        //     return "Course Updated Sucessfully"
        // }
        else {
            return "Invalid Operation"
        }

    }
    catch {
        return new Error("Something went wrong")
    }
}

export default adminUserOps
