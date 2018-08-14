import { call, put, takeEvery } from 'redux-saga/effects';
import ReviewService from '../api/ReviewService';
import {
    FETCH_REVIEWS_INIT,
    FETCH_REVIEWS_SUCCESS,
    SIGN_OUT,
    PLACE_REVIEWS_REQUESTED,
    FETCH_PREVIOUS_FAILED,
    FETCH_PREVIOUS_SUCCESS,
    FETCH_PREVIOUS_INIT
} from "../actions/actionTypes";

function* fetchReviews(action, placeId) {
    try {
        yield put ({ type: FETCH_REVIEWS_INIT });
        const response = yield call (ReviewService.fetchReviews, placeId);

        if(response.status === 200) {
            yield put({ type: FETCH_REVIEWS_SUCCESS, payload: response });
        }
    } catch(e) {
        if(e.status === 401) {
            yield put({ type: SIGN_OUT });
        } else {
            yield put({ type: FETCH_REVIEWS_SUCCESS, payload: [] });
        }
    }
}

function* watchFetchMyPreviousReviewsRequests(action, placeId) {
    try {
        put({ type: FETCH_PREVIOUS_INIT });
        const response = yield call (ReviewService.fetchMyPreviousReviews, placeId);
        yield put({ type: FETCH_PREVIOUS_SUCCESS, data: response })
    } catch(e) {
        put({ type: FETCH_PREVIOUS_FAILED })
    }
}

export function* watchReviewByPlaceIdRequests(placeId) {
    yield takeEvery(PLACE_REVIEWS_REQUESTED, fetchReviews, placeId);
}

