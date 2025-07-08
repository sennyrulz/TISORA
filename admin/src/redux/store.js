import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./rootReducer" // Import your reducers

const store = configureStore({
   reducer: {
    admin: adminReducer,
    devTools: process.env.NODE_ENV !== "production",
  }
});

export default store;
