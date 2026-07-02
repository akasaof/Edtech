import { createSlice, current } from "@reduxjs/toolkit";

 

const initialState ={
    sampleDatas:[],
    currentTab:"Home"
}
const sample = createSlice({
    name:"Data",
    initialState,
    reducers:{
        sampleData:(state,action)=>{
            console.log(action.payload)
            console.log(state.sampleDatas)

        },
        changeTab:(state,action)=>{
            state.currentTab = action.payload
        }
    }
})

export const {sampleData,changeTab} = sample.actions 
export default sample.reducer