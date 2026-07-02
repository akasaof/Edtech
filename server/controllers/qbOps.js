import QuestionBank from "../models/questionBank.js"

const adminQbOps = async (arg) => {
    try {
        const { operation, data } = arg
        if (operation === "get") {
            const courses = await QuestionBank.find()
            return courses
        }
        else if (operation === "create") {
            const duplicate = await QuestionBank.find(data)
            console.log(duplicate) 
            if(duplicate.length === 0){
                await QuestionBank.insertOne(data)
                return "Added Sucessfully"
            }
            else{
                return "Question Already exist"
            }
           
        }
        else if (operation === "delete") {
            const { id } = data
            await QuestionBank.findByIdAndDelete(id)
            return "Question Bank Deleted Sucessfully"
        }
        else if (operation === "update") {
            const { id, changes } = data
            console.log(id)
            console.log(changes)
            await QuestionBank.findByIdAndUpdate(id, changes)
            return "Question Updated Sucessfully"
        }
        else {
            return "Invalid Operation"
        }
    }
    catch {
        console.log("Error")
    }
}

export default adminQbOps