import {combineReducers} from "redux";
import selectedVenue from "./venueReducer";
import user from "./userReducer";
import reviewList from "./reviewList";
import newReview from "./newReview";
import propertiesInformation from "./propertiesInformationReducer";
import userReviewList from './userReviewList';

export default combineReducers({
    selectedVenue,
    user,
    reviewList,
    newReview,
    propertiesInformation,
    userReviewList,
});
