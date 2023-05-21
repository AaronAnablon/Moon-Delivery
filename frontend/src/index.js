import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { productsApi } from "./slices/productsApi";
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals())

const rootElement = document.getElementById("root");

const appRoot = createRoot(rootElement);
appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
