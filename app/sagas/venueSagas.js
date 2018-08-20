import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';
import { VENUE_SELECTED, VENUE_INFORMATION_REQUESTED } from "../actions/actionTypes";

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actionsOld
function* fetchVenueData(action) {
    try {
        console.log("inside venue worker saga - action: ", action);
        const placeId = action.payload;
        const venueData = yield call(VenueService.fetchGooglePlaceObject, placeId);
        const reviews = yield call(VenueService.fetchReviews, placeId);

        console.log("venueData: ", venueData);
        console.log("reviews: ", reviews);

        const payload = Object.assign(venueData, { reviews: reviews});
        yield put({ type: VENUE_SELECTED, payload });
    } catch(e) {
        console.error("error fetching venue data: ", e);
    }
}
/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
export const watchVenueSagas = [
    takeEvery(VENUE_INFORMATION_REQUESTED, fetchVenueData),
];