import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';

import {
    VENUE_SELECTED,
    VENUE_DESELECTED
} from "../actions/actionTypes";

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actions
function* fetchVenueData(action, placeId) {
    try {

        const venueData = yield call(VenueService.fetchGooglePlaceObject(placeId));
        const reviews = yield call(VenueService.fetchVenueData(placeId));

        yield put({
            type: VENUE_SELECTED,
            payload: Object.assign(venueData, { reviews: reviews })
        });

    } catch(e) {

    }
}

function* deselectVenue(action) {
    yield({ type: action });
}

/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
function* selectVenueSaga(placeId) {
    yield takeEvery("VENUE_FETCH_REQUESTED", fetchVenueData, placeId);
}

function* deselectVenueSaga() {
    yield takeEvery("VENUE_DESELECT_REQUESTED", deselectVenue);
}

export default selectVenueSaga();
export default deselectVenueSaga();