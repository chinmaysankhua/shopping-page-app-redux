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
    // Show / hide cart
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },

    // Add product to cart
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

    // Remove one quantity
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

      // If quantity becomes 0, remove product completely
      if (existingItem.quantity === 0) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }
    },
  },
});

export const {
  toggleCart,
  addItem,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;