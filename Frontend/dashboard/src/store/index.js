import { configureStore } from "@reduxjs/toolkit";
import { combinedReducer } from "./combined-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

// Exporting the store
export const configureReduxStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
  });
  return store;
};

// Exporting the persistor
export const configureReduxPersistor = (store) => {
  const persistor = persistStore(store);
  return persistor;
};
