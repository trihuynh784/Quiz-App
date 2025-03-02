import { authReducer } from "./authReducer";
import { combineReducers } from "redux";

export const allReducers = combineReducers({
  authReducer,
  
  //add more reducers
})