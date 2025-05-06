import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ErrorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    getErrors: (state, action) => {
      return action.payload;
    },
    clearErrors: () => {
      return {};
    },
  },
});

export const { getErrors, clearErrors } = ErrorSlice.actions;
export default ErrorSlice.reducer;
