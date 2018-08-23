import { call, put, takeEvery } from 'redux-saga/effects';
import ReviewService from '../api/ReviewService';
import {
    ON_CREATE_REVIEW,
    ON_CREATE_REVIEW_INIT,
    ON_CREATE_REVIEW_SUCCESS,
    ON_FETCH_REVIEWS_INIT,
    ON_FETCH_REVIEWS_SUCCESS,
    ON_FETCH_REVIEWS_FAILED,
    ON_PLACE_REVIEWS_REQUESTED,
    ON_FETCH_PREVIOUS_REQUESTED,
    ON_FETCH_PREVIOUS_FAILED,
    ON_FETCH_PREVIOUS_SUCCESS,
    ON_FETCH_PREVIOUS_INIT,
} from "../actions/reviews";

import {
    ON_VENUE_INFORMATION_REQUESTED
} from '../actions/venue';

import {
    ON_SIGN_OUT
} from '../actions/account';

function* fetchReviewsByPlaceId(action) {

    try {
        const placeId = action.payload;
        yield put ({ type: ON_FETCH_REVIEWS_INIT });
        const response = yield call(ReviewService.fetchReviews, placeId);

        if(response.status === 200) {
            yield put.resolve({ type: ON_FETCH_REVIEWS_SUCCESS, payload: response.data });
        }

    } catch(e) {

        if(e.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else {
            yield put({ type: ON_FETCH_REVIEWS_FAILED });
        }
    }
}

function* fetchMyPreviousReviewsByPlaceId(action) {

    try {
        put({ type: ON_FETCH_PREVIOUS_INIT });
        const placeId = action.payload;
        const response = yield call (ReviewService.fetchMyPreviousReviews, placeId);
        yield put({ type: ON_FETCH_PREVIOUS_SUCCESS, payload: response })
    } catch(e) {
        put({ type: ON_FETCH_PREVIOUS_FAILED })
    }
}

function* createReview(action) {

    try {
        put({ type: ON_CREATE_REVIEW_INIT });
        const reviewBody = action.payload;
        const response = yield call(ReviewService.createReview, reviewBody);
        const review = response.data;
        yield put({ type: ON_CREATE_REVIEW_SUCCESS, payload: review });
        yield put({ type: ON_VENUE_INFORMATION_REQUESTED, payload: reviewBody.sted.placeId});
    } catch (e) {
        // Todo: handle create review error
    }
}

export const watchReviewSagas = [
  takeEvery(ON_PLACE_REVIEWS_REQUESTED, fetchReviewsByPlaceId),
  takeEvery(ON_FETCH_PREVIOUS_REQUESTED, fetchMyPreviousReviewsByPlaceId),
  takeEvery(ON_CREATE_REVIEW, createReview),
];