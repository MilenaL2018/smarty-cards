import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  background: "#ffffff",
  color: "black",
};

export const theme = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    changeBackground: (state) => {
      let contrast = state.color;

      if (state.color === "black" && state.background === "#ffffff") {
        contrast = "white";
      }

      if (state.color === "white" && state.background === "#101212") {
        contrast = "black";
      }

      return {
        background: state.background === "#ffffff" ? "#101212" : "#ffffff",
        color: contrast,
      };
    },
    changeColor: (state, payload) => {
      return {
        background: state.background,
        color: payload.payload,
      };
    },
  },
});

export const { changeBackground, changeColor } = theme.actions;
export default theme.reducer;
