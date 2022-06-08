import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducer";
import clientReducer from "./reducers/clientReducer";
import listReducer from "./reducers/listReducer";
import modalReducer from "./reducers/modalReducer";
import refetchReducer from "./reducers/refetchReducer";
import searchReducer from "./reducers/searchReducer";

export const store = configureStore({
  reducer: {
    list: listReducer,
    client: clientReducer,
    modal: modalReducer,
    loading: loadingReducer,
    refetch: refetchReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
