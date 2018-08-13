import { call, put, takeEvery } from 'redux-saga/effects';
import ReviewService from '../api/ReviewService';
import * as actions from '../actions';

function* fetchReviews(action, placeId) {
    try {
        yield put ({ type: actions.FETCH_REVIEWS_INIT });
        const response = yield call (ReviewService.fetchReviews, placeId);

        if(response.status === 200) {
            yield put({ type: actions.FETCH_REVIEWS_SUCCESS, payload: response });
        }
    } catch(e) {
        if(e.status === 401) {
            yield put({ type: actions.SIGN_OUT });
        } else {
            yield put({ type: actions.FETCH_REVIEWS_SUCCESS, payload: [] });
        }
    }
}

function* fetchMyPreviousReview(action, placeId) {
    try {
        put({ type: actions.FETCH_PREVIOUS_INIT });
        const response = yield call (ReviewService.fetchMyPreviousReviews, placeId);
        yield put({ type: actions.FETCH_PREVIOUS_SUCCESS, data: response })
    } catch(e) {
        put({ type: actions.FETCH_PREVIOUS_FAILED })
    }
}

export function* fetchReviewByPlaceId(placeId) {
    yield takeEvery(actions.PLACE_REVIEWS_REQUESTED, fetchReviews, placeId);
}

