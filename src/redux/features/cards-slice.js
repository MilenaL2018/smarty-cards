import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const initialState = [];

export const cards = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    addCard: (state, payload) => {
      state.push({ uid: uid(), ...payload.payload });
    },
    editCard: (state, payload) => {
      const index = state.findIndex((card) => card.uid === payload.payload.uid);
      state[index] = { ...payload.payload };
    },
    findCard: (state, payload) => {
      let filterByTitle = state.filter(
        (item) => item["title"] === payload.payload
      );
      return filterByTitle;
    },
    sortCards: (state, payload) => {
      if (payload.payload.order === "AZ") {
        state.sort();
      } else {
        state.sort().reverse();
      }
      return state;
    },
    empyTrash: () => {
      let updateStack = state.filter((card) => card.tag !== "deleted");
      return updateStack;
    },
    deleteCard: (state, payload) => {
      return state.filter((card) => card.uid !== payload.payload.uid);
    },
    undoDeleteCard: (state, payload) => {
      let restoredCard = state.find((card) => card.uid === payload.payload.uid);
      if (restoredCard) return state.push(restoredCard);
    },
  },
});

export const {
  getCards,
  empyTrash,
  deleteCard,
  addCard,
  undoDeleteCard,
  editCard,
  findCard,
  sortCards,
} = cards.actions;
export default cards.reducer;
