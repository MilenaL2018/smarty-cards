import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  isDisplayed: false,
  id: "",
};

export const snackBar = createSlice({
  name: "snackBar",
  initialState: initialState,
  reducers: {
    displayHandler: (state, payload) => {
      return {
        id: payload.payload.id,
        msg: payload.payload.msg,
        isDisplayed: true,
      };
    },
    closeHandler: () => {
      return {
        msg: "",
        isDisplayed: false,
      };
    },
  },
});

export const { displayHandler, closeHandler } = snackBar.actions;
export default snackBar.reducer;
