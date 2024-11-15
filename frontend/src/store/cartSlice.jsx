import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: null,
    reducers: {
        addCart: (state, action) => {
            return action.payload;
        },
        removeCart: (state, action) => {
            return null;
        }
    }
})

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;