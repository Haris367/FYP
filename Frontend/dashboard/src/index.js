import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
// import Login from "./components/login/Login";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { configureReduxPersistor, configureReduxStore} from './store';
import { PersistGate } from 'redux-persist/integration/react';

const store = configureReduxStore();
const persistor = configureReduxPersistor(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>
);

reportWebVitals();
