import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;