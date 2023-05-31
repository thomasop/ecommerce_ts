import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: ""
}
const FlashMessage = createSlice({
    name: 'FlashMessage',
    initialState: initialState,
    reducers: {
        edit: (state, action) => {
            state.message = action.payload.message
        }
    }
})

export default FlashMessage