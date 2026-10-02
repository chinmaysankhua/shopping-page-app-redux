import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { FIREBASE_URL } from "../firebase";

// ------------------------------------
// INITIAL STATE
// ------------------------------------

const initialState = {
  isVisible: false,

  items: [],

  totalQuantity: 0,

  notification: {
    status: null,
    message: null,
  },
};

// ------------------------------------
// ASYNC THUNK
// ------------------------------------

export const sendCartData = createAsyncThunk(
  "cart/sendCartData",

  async (cart) => {
    const response = await fetch(
      `${FIREBASE_URL}/cart.json`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sending cart data failed!");
    }

    const data = await response.json();

    return data;
  }
);

// ------------------------------------
// CART SLICE
// ------------------------------------

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

  setCart(state, action) {
    state.items = action.payload.items || [];
    state.totalQuantity =
      action.payload.totalQuantity || 0;
  },

  // 👇 ADD THIS
  clearNotification(state) {
    state.notification.status = null;
    state.notification.message = null;
  },
},

  // ------------------------------------
  // ASYNC THUNK LIFECYCLE
  // ------------------------------------

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(sendCartData.pending, (state) => {
        state.notification.status = "pending";

        state.notification.message =
          "Sending cart data!";
      })

      // SUCCESS
      .addCase(sendCartData.fulfilled, (state) => {
        state.notification.status = "success";

        state.notification.message =
          "Sent cart data successfully!";
      })

      // ERROR
      .addCase(sendCartData.rejected, (state) => {
        state.notification.status = "error";

        state.notification.message =
          "Sending cart data failed!";
      });
  },
});

export const {
  toggleCart,
  addItem,
  removeItem,
  setCart,
  clearNotification,
} = cartSlice.actions;

export default cartSlice.reducer;