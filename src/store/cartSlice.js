import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },

    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.totalQuantity++;
    },

    removeItem(state, action) {
      const id = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (!existingItem) {
        return;
      }

      existingItem.quantity--;
      state.totalQuantity--;

      if (existingItem.quantity === 0) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }
    },

    // Used when loading the cart from Firebase
    setCart(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
    },
  },
});

export const {
  toggleCart,
  addItem,
  removeItem,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;