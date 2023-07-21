import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cards-slice";
import themeReducer from "./features/theme-slice";
import snackBarReducer from "./features/snackbar-slice";

export const store = configureStore({
    reducer: {
        cardsReducer,
        themeReducer,
        snackBarReducer
    },
})

export const rootState = store.getState;
export const appDispatch = store.dispatch;