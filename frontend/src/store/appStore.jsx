import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.jsx";
import cartSlice from "./cartSlice.jsx"

const appStore = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
})

export default appStore;