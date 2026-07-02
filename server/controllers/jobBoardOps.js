import jobBoard from "../models/jobBoard.js"

const adminJobsOps = async (arg)=>{
    try {
            const { operation,data } = arg
            if (operation === "get") {
                const users = await jobBoard.find()
                return users
            }
            else if (operation === "create") {
                console.log(data)
                const duplicate = await jobBoard.find({phone:data.phone})
                if(duplicate.length===0){
                    await jobBoard.insertOne(data)
                    return "Job Added Sucessfully"
                }
               else{
                return "Job already exist"
               }
            }
            else if (operation === "delete") {
                const { id } = data
                await jobBoard.findByIdAndDelete(id)
                return "Job Deleted Sucessfully"
            }
            else if (operation === "update") {
                const { id, changes } = data
                console.log(id)
                console.log(changes)
                await jobBoard.findByIdAndUpdate(id, changes)
                return "Job Board Updated Sucessfully"
            }
            else {
                return "Invalid Operation"
            }
    
        }
        catch {
            return new Error("Something went wrong")
        }
}

export default adminJobsOps