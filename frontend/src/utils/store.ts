import { configureStore } from "@reduxjs/toolkit";
import FlashMessage from "../features/FlashMessage";
import Auth from "../features/Auth";


const store = configureStore({
    reducer: {
        FlashMessage: FlashMessage.reducer,
        Auth: Auth.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store