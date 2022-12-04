import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
