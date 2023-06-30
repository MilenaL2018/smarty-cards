import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cards-slice";
import themeReducer from "./features/theme-slice";

export const store = configureStore({
    reducer: {
        cardsReducer,
        themeReducer
    },
})

export const rootState = store.getState;
export const appDispatch = store.dispatch;