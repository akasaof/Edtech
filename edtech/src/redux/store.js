import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./Silcers/sampleSlice.js"
import userSlice from "./Silcers/userinfo.js"



export const store = configureStore({
    reducer:{
        sampleData:sampleSlice,
        userInfo:userSlice
    }
})