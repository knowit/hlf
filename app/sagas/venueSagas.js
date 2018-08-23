import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';
import { ON_VENUE_SELECTED, ON_VENUE_INFORMATION_REQUESTED } from "../actions/venue";

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actionsOld
function* fetchVenueData(action) {
    try {
        const placeId = action.payload;
        const venueData = yield call(VenueService.fetchGooglePlaceObject, placeId);
        const reviews = yield call(VenueService.fetchReviews, placeId);

        const payload = Object.assign(venueData, { reviews: reviews});

        console.log("inside fetchVenueData - result: ", payload);

        yield put({ type: ON_VENUE_SELECTED, payload });
    } catch(e) {
        // Todo: handle fetch venue data error
    }
}

/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
export const watchVenueSagas = [
    takeEvery(ON_VENUE_INFORMATION_REQUESTED, fetchVenueData),
];