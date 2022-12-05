import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload });
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(
        (item) => item.product_id === action.payload
      );
      state.splice(index, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
