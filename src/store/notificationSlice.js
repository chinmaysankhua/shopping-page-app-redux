import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {},
});

export default notificationSlice.reducer;