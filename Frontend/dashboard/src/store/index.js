import { configureStore } from "@reduxjs/toolkit";
import { combinedReducer } from "./combined-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
