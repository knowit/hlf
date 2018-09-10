import { call, put, takeEvery } from 'redux-saga/effects';
import ReviewService from '../api/ReviewService';
import {
    ON_CREATE_REVIEW,
    ON_CREATE_REVIEW_INIT,
    ON_CREATE_REVIEW_SUCCESS,
    ON_FETCH_REVIEWS_SUCCESS,
    ON_FETCH_REVIEWS_FAILED,
    ON_PLACE_REVIEWS_REQUESTED,
    ON_FETCH_PREVIOUS_REQUESTED,
    ON_FETCH_PREVIOUS_FAILED,
    ON_FETCH_PREVIOUS_SUCCESS,
    ON_FETCH_PREVIOUS_INIT,
    ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT,
    ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS,
    ON_DELETE_REVIEWS_BY_PLACE_ID,
    ON_DELETE_REVIEWS_BY_PLACE_ID_SUCCESS,
    ON_DELETE_REVIEWS_BY_PLACE_ID_FAILED,
    ON_UPDATE_REVIEW,
    ON_UPDATE_REVIEW_FAILED,
    ON_UPDATE_REVIEW_SUCCESS,
    ON_DESTROY_REVIEW_VALUE,
} from "../actions/reviews";

import {
    ON_VENUE_REVIEWS_REQUESTED
} from '../actions/venue';

import {
    ON_SIGN_OUT
} from '../actions/account';

function* fetchReviewsByPlaceId(action) {

    try {
        const response = yield call(ReviewService.fetchReviews, action.payload);
        yield put.resolve({ type: ON_FETCH_REVIEWS_SUCCESS, payload: response });

    } catch(e) {
        console.error(e);
        yield put({ type: ON_FETCH_REVIEWS_FAILED });
    }
}

function* fetchMyPreviousReviewsByPlaceId(action) {

    try {
        put({ type: ON_FETCH_PREVIOUS_INIT });
        const placeId = action.payload;
        const response = yield call (ReviewService.fetchMyPreviousReviews, placeId);
        yield put({ type: ON_FETCH_PREVIOUS_SUCCESS, payload: response })
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.code && e.code === 'ECONNABORTED') || (e.response && e.response === 408)) {
            // Todo: handle timeout error
        } else {
            put({ type: ON_FETCH_PREVIOUS_FAILED })
        }
    }
}

function* createReview(action) {

    try {
        put({ type: ON_CREATE_REVIEW_INIT });
        const reviewBody = action.payload;
        const review = yield call(ReviewService.createReview, reviewBody);
        yield put({ type: ON_CREATE_REVIEW_SUCCESS, payload: review });
        yield put({ type: ON_VENUE_REVIEWS_REQUESTED, payload: reviewBody.sted.placeId});
    } catch (e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.code && e.code === 'ECONNABORTED') || (e.response && e.response === 408)) {
            // Todo: handle timeout error
        } else {
            // Todo: handle create review error
            //put({ type: ON_CREATE_REVIEW_FAILED })
        }
    }
}

function* fetchPreviousReviewsByUserInit(action) {
    try {
        const reviews = yield call(ReviewService.fetchPreviousReviewsByUser, action.payload);
        yield put({ type: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS, payload: reviews});
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.code && e.code === 'ECONNABORTED') || (e.response && e.response === 408)) {
            // Todo: handle timeout error
        } else {
            // Todo: handle fetchPreviousReviewsByUser error
            console.log(e);
        }
    }
}

function* deleteReviewsByPlaceId(action) {
    try {
        const placeId = action.payload;
        const deleted = yield call(ReviewService.deleteReviewsByPlaceId, placeId);
        yield put({ type: ON_DELETE_REVIEWS_BY_PLACE_ID_SUCCESS, payload: placeId });
    } catch(e) {
        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.code && e.code === 'ECONNABORTED') || (e.response && e.response === 408)) {
            // Todo: handle timeout error
            console.log("ECONNABORTED");
        } else {
            console.log(e);
        }

        yield put({ type: ON_DELETE_REVIEWS_BY_PLACE_ID_FAILED });
    }
}

function* updateReview(action) {
    try {
        const review = action.payload;
        const updated = yield call(ReviewService.updateReview, review);
        yield put({ type: ON_UPDATE_REVIEW_SUCCESS, payload: updated.data });
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else {
            console.log(e);
        }

        yield put({ type: ON_UPDATE_REVIEW_FAILED });
    }
}

function* removeValueFromReview(action) {
    try {
        const review = action.payload;
        yield call(ReviewService.removeValueFromReview, review);
        yield put({ type: ON_UPDATE_REVIEW_SUCCESS, payload: review });
    } catch(e) {

        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else {
            console.log(e);
        }

        yield put({ type: ON_UPDATE_REVIEW_FAILED });
    }
}

export const watchReviewSagas = [
  takeEvery(ON_PLACE_REVIEWS_REQUESTED, fetchReviewsByPlaceId),
  takeEvery(ON_FETCH_PREVIOUS_REQUESTED, fetchMyPreviousReviewsByPlaceId),
  takeEvery(ON_CREATE_REVIEW, createReview),
  takeEvery(ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT, fetchPreviousReviewsByUserInit),
  takeEvery(ON_DELETE_REVIEWS_BY_PLACE_ID, deleteReviewsByPlaceId),
  takeEvery(ON_UPDATE_REVIEW, updateReview),
  takeEvery(ON_DESTROY_REVIEW_VALUE, removeValueFromReview),
];