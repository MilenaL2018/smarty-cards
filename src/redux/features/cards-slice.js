import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const initialState = [
  {
    uid: uid(),
    title: "Tarjeta de prueba",
    content: "Aquí aparecerán tus notas.",
    tag: "active",
  },
];

export const cards = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    getCards: (state, payload) => {
      return state.filter((card) => card.tag === payload.payload);
    },
    empyTrash: () => {
      let updateStack = state.filter((card) => card.tag !== "deleted");
      return updateStack;
    },
    addCard: (state, payload) => {
      state.push({ uid: uid(), ...payload.payload });
    },
    editCard: (state, payload) => {
      const index = state.findIndex((card) => card.uid === payload.payload.uid);
      state[index] = { ...payload.payload };
    },
    undoDeleteCard: (state, payload) => {
      let restoredCard = state.find((card) => card.uid === payload.payload.uid);
      if (restoredCard) return state.push(restoredCard);
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
  },
});

export const {
  getCards,
  deleteCards,
  addCard,
  undomoveCard,
  editCard,
  findCard,
  sortCards,
} = cards.actions;
export default cards.reducer;
