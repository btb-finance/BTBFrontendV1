// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import orcaReducer from "./slices/orca/orcaSlice";
import orcaWhirlpoolSlice from "./slices/orca/whirlpoolSlice"

export const store = configureStore({
  reducer: {
    orca: orcaReducer,
    whirlpool: orcaWhirlpoolSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
