import { combineReducers } from "redux";
import venueReducer from "./venueReducer";
import userReducer from "./userReducer";

export default combineReducers({
  venueReducer,
  userReducer
});
