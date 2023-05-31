import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    status: ""
}
const Auth = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        storeToken: (state, action) =>  {
            state.token = action.payload.token
            state.status = action.payload.status
        }
    }
})

export default Auth