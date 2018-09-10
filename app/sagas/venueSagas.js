import { call, put, takeEvery } from 'redux-saga/effects';
import VenueService from '../api/VenueService';
import {
    ON_VENUE_SELECTED,
    ON_VENUE_INFORMATION_REQUESTED,
    ON_VENUE_REVIEWS_REQUESTED,
    ON_VENUE_REVIEWS_FETCHED
} from "../actions/venue";
import {ON_SIGN_OUT} from "../actions/account";
import {ON_FETCH_REVIEWS_INIT} from "../actions/reviews";

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actionsOld
function* fetchVenueData(action) {
    try {
        const placeId = action.payload;
        const venueData = yield call(VenueService.fetchGooglePlaceObject, placeId);
        const reviews = yield call(VenueService.fetchReviews, placeId);

        const payload = Object.assign(venueData, { reviews: reviews});
        yield put ({ type: ON_FETCH_REVIEWS_INIT });
        yield put({ type: ON_VENUE_SELECTED, payload });
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.response && e.response.status === 408) || (e.code && e.code === 'ECONNABORTED') )  {
            // Todo: handle timeout error
        } else {
            // Todo: handle fetch venue data error
            //put({ type: ON_FETCH_VENUE_DATA_FAILED })
            console.log("error: ", e.message);
        }
    }
}

function* fetchVenueReviews(action) {
    try {
        const placeId = action.payload;
        const reviews = yield call(VenueService.fetchReviews, placeId);
        yield put ({ type: ON_FETCH_REVIEWS_INIT });
        yield put({ type: ON_VENUE_REVIEWS_FETCHED, reviews });
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.response && e.response.status === 408) || (e.code && e.code === 'ECONNABORTED') )  {
            // Todo: handle timeout error
        } else {
            // Todo: handle fetch venue reviews error
            //put({ type: ON_FETCH_VENUE_REVIEWS_FAILED })
            console.log("error: ", e.message);
        }
    }
}

/*
    Starts fetchVenueData on each dispatched 'VENUE_FETCH_REQUESTED' action.
    Allows concurrent fetches of venue.
 */
export const watchVenueSagas = [
    takeEvery(ON_VENUE_INFORMATION_REQUESTED, fetchVenueData),
    takeEvery(ON_VENUE_REVIEWS_REQUESTED, fetchVenueReviews),
];