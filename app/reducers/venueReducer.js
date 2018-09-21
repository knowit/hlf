import {
    ON_VENUE_SELECTED,
    ON_VENUE_DESELECTED,
    ON_VENUE_SCREEN_CHANGE,
    ON_VENUE_REVIEWS_FETCHED
} from "../actions/venue";
import {ON_LOGIN_SUCCESS, ON_SIGN_OUT} from "../actions/account";
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

            if(state.venue && state.screen === REVIEW_SCREEN) {
                return { ...state, screen: NEW_REVIEW_SCREEN };
            }

            return { ...state };

        case ON_VENUE_SCREEN_CHANGE:
            return { ...state, screen: action.payload };

        case ON_CREATE_REVIEW_SUCCESS:
            return { ...state, screen: NEW_REVIEW_SCREEN };

        case ON_VENUE_REVIEWS_FETCHED:

            const updatedVenue = state.venue;

            if(updatedVenue) {
                updatedVenue.reviews = action.reviews;
            }

            return { ...state, venue: updatedVenue };

        case ON_SIGN_OUT:
            return {...state, screen: REVIEW_SCREEN};

        default:
            return state;
    }
};
