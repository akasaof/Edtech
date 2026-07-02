import QuestionBank from "../models/questionBank.js";

const filter = async(list)=>{
    const promises = list.map(async (item) => {
            const week = item.split("-")[1];
            return await QuestionBank.find({ week });
        });
    const results = await Promise.all(promises);
    const data = results.flat();
    console.log(data)
    return data
}

export default filter