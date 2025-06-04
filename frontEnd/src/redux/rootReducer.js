import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice"
import userReducer from "./userAuthSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
