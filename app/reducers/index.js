import { combineReducers } from "redux";
import selectedVenue from "./venueReducer";
import user from "./userReducer";
import reviewList from "./reviewList";
import newReview from "./newReview";

export default combineReducers({
  selectedVenue,
  user,
  reviewList,
  newReview
});
