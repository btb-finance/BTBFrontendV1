// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import whirlpoolReducer, { fetchWhirlpoolData } from "./slices/orca/whirlpoolSlice";
import orcaReducer from "./slices/orca/orcaSlice";
import radiumPoolReducer from "./slices/radium/poolSlice";

export const store = configureStore({
  reducer: {
    whirlpool: whirlpoolReducer,
    orca: orcaReducer,
    radiumPools: radiumPoolReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Fetch initial data
store.dispatch(fetchWhirlpoolData());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
