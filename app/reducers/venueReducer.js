import {
    ON_VENUE_SELECTED,
    ON_VENUE_DESELECTED,
    ON_VENUE_SCREEN_CHANGE,
    ON_VENUE_REVIEWS_FETCHED
} from "../actions/venue";
import {ON_LOGIN_SUCCESS} from "../actions/account";
import { REVIEW_SCREEN, NEW_REVIEW_SCREEN } from "../containers/VenueDetails";
import {ON_CREATE_REVIEW_SUCCESS} from "../actions/reviews";

export default (state = {
    venue: null,
    screen: REVIEW_SCREEN
}, action) => {
    switch (action.type) {

        case ON_VENUE_SELECTED:
            return { venue: action.payload, screen: REVIEW_SCREEN };

        case ON_VENUE_DESELECTED:
            return { ...state, venue: null };

        case ON_LOGIN_SUCCESS:
            return { ...state, screen: NEW_REVIEW_SCREEN };

        case ON_VENUE_SCREEN_CHANGE:
            return { ...state, screen: action.payload };

        case ON_CREATE_REVIEW_SUCCESS:
            return { ...state, screen: NEW_REVIEW_SCREEN };

        case ON_VENUE_REVIEWS_FETCHED:

            console.log("state.venue: ", state.venue);
            console.log("action.reviews: ", action.reviews);

            const updatedVenue = state.venue;

            if(updatedVenue) {
                updatedVenue.reviews = action.reviews;
            }

            return { ...state, venue: updatedVenue };

        default:
            return state;
    }
};
