import { call, put, takeEvery } from 'redux-saga/effects';
import ReviewService from '../api/ReviewService';
import {
    CREATE_REVIEW,
    CREATE_REVIEW_INIT,
    CREATE_REVIEW_SUCCESS,
    FETCH_REVIEWS_INIT,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILED,
    SIGN_OUT,
    PLACE_REVIEWS_REQUESTED,
    FETCH_PREVIOUS_REQUESTED,
    FETCH_PREVIOUS_FAILED,
    FETCH_PREVIOUS_SUCCESS,
    FETCH_PREVIOUS_INIT, VENUE_INFORMATION_REQUESTED,
} from "../actions/actionTypes";

function* fetchReviewsByPlaceId(action) {

    try {
        const placeId = action.payload;
        yield put ({ type: FETCH_REVIEWS_INIT });
        const response = yield call(ReviewService.fetchReviews, placeId);

        if(response.status === 200) {
            yield put.resolve({ type: FETCH_REVIEWS_SUCCESS, payload: response.data });
        }

    } catch(e) {

        if(e.status === 401) {
            yield put({ type: SIGN_OUT });
        } else {
            yield put({ type: FETCH_REVIEWS_FAILED });
        }
    }
}

function* fetchMyPreviousReviewsByPlaceId(action) {

    try {
        put({ type: FETCH_PREVIOUS_INIT });
        const placeId = action.payload;
        const response = yield call (ReviewService.fetchMyPreviousReviews, placeId);
        yield put({ type: FETCH_PREVIOUS_SUCCESS, payload: response })
    } catch(e) {
        put({ type: FETCH_PREVIOUS_FAILED })
    }
}

function* createReview(action) {

    try {
        put({ type: CREATE_REVIEW_INIT });
        const reviewBody = action.payload;
        const response = yield call(ReviewService.createReview, reviewBody);
        const review = response.data;
        yield put({ type: CREATE_REVIEW_SUCCESS, payload: review });
        yield put({ type: VENUE_INFORMATION_REQUESTED, payload: reviewBody.sted.placeId});
    } catch (e) {
        // Todo: handle create review error
    }
}

export const watchReviewSagas = [
  takeEvery(PLACE_REVIEWS_REQUESTED, fetchReviewsByPlaceId),
  takeEvery(FETCH_PREVIOUS_REQUESTED, fetchMyPreviousReviewsByPlaceId),
  takeEvery(CREATE_REVIEW, createReview),
];