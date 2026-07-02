import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    account: [],
}

const userSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        updateStatus: (state, action) => {
            state.account = action.payload;
            state.isAdmin = action.payload.role === "admin";
    }
}
})

export const { updateStatus } = userSlice.actions
export default userSlice.reducer