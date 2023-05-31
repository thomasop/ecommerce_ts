import { configureStore } from "@reduxjs/toolkit";
import FlashMessage from "../features/FlashMessage";


const store = configureStore({
    reducer: {
        flashMessage: FlashMessage.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store