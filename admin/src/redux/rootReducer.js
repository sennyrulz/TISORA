import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice"
import adminReducer from "./adminAuthSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
  user: adminReducer,
});

export default rootReducer;
