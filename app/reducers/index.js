import { combineReducers } from "redux";
import selectedVenue from "./venueReducer";
import userReducer from "./userReducer";
import reviewList from "./reviewList";

export default combineReducers({
  selectedVenue,
  userReducer,
  reviewList
});
