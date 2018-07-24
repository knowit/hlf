import { combineReducers } from "redux";
import selectedVenue from "./venueReducer";
import userReducer from "./userReducer";

export default combineReducers({
  selectedVenue,
  userReducer
});
