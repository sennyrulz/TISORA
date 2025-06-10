import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice"; 

const store = configureStore({
  reducer: userReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
