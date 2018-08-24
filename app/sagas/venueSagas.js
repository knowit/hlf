import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';
import { ON_VENUE_SELECTED, ON_VENUE_INFORMATION_REQUESTED } from "../actions/venue";
import {ON_SIGN_OUT} from "../actions/account";

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

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.response && e.response.status === 408) || (e.code && e.code === 'ECONNABORTED') )  {
            // Todo: handle timeout error
        } else {
            // Todo: handle fetch venue data error
            //put({ type: ON_FETCH_VENUE_DATA_FAILED })
        }
    }
}

/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
export const watchVenueSagas = [
    takeEvery(ON_VENUE_INFORMATION_REQUESTED, fetchVenueData),
];