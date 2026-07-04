import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    account: sessionStorage.getItem("account")?JSON.parse(sessionStorage.getItem("account")):[],
}

const userSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        updateStatus: (state, action) => {
            state.account = action.payload;
            state.isAdmin = action.payload.role === "Admin";
    }
}
})

export const { updateStatus } = userSlice.actions
export default userSlice.reducer