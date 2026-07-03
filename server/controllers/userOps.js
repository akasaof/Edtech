import Login from "../models/account.js";

const adminUserOps = async (arg) => {
    try {
        const { operation,data } = arg
        if (operation === "get") {
            const users = await Login.find({"role":"Student"})
            return users
        }
        else if (operation === "create") {
            const account = data.account
            console.log(account)
            const duplicate = await Login.find({phone:account.phone})
            if(duplicate.length===0){
                await Login.insertOne(account)
                return "Added Sucessfully"
            }
           else{
            return "Account already exist"
           }
        }
        else if (operation === "delete") {
            const  id  = data.account
            console.log(id)
            await Login.findByIdAndDelete(id)
            return "Course Deleted Sucessfully"
        }
        else if (operation === "update") {
            const { id, changes } = data
            console.log(id)
            console.log(changes)
            await Login.findByIdAndUpdate(id, changes)
            return "Changes Updated Sucessfully"
        }
        else {
            return "Invalid Operation"
        }

    }
    catch {
        return new Error("Something went wrong")
    }
}

export default adminUserOps
