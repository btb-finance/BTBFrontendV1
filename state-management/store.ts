// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import orcaReducer from "./slices/orcaSlice";

export const store = configureStore({
  reducer: {
    orca: orcaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
