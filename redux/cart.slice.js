import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload });
    },
    removeFromCart: (state, { payload }) => {
      const index = state.findIndex(
        (item) =>
          item.product_id === payload.product_id &&
          item.color === payload.color &&
          item.paper_type === payload.paper_type &&
          item.price === payload.price &&
          item.quantity === payload.quantity &&
          item.size === payload.size
      );
      state.splice(index, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
