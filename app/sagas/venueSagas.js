import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';
import * as actions from '../actions';

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actionsOld
function* fetchVenueData(placeId) {
    try {

        const venueData = yield call(VenueService.fetchGooglePlaceObject(placeId));
        const reviews = yield call(VenueService.fetchVenueData(placeId));

        yield put({
            type: actions.VENUE_SELECTED,
            payload: Object.assign(venueData, { reviews: reviews })
        });

    } catch(e) {

    }
}

function* deselectVenue() {
    try {
        yield({ type: actions.VENUE_DESELECTED });
    } catch(e) {

    }
}

/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
export function* selectVenueSaga(placeId) {
    yield takeEvery(actions.VENUE_INFORMATION_REQUESTED, fetchVenueData, placeId);
}

export function* deselectVenueSaga() {
    yield takeEvery(actions.VENUE_DESELECT_REQUESTED, deselectVenue);
}