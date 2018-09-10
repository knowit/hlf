export const ON_FETCH_REVIEWS_INIT = "ON_FETCH_REVIEWS_INIT";
export const ON_FETCH_REVIEWS_SUCCESS = "ON_FETCH_REVIEWS_SUCCESS";
export const ON_FETCH_REVIEWS_FAILED = "ON_FETCH_REVIEWS_FAILED";
export const ON_CREATE_REVIEW = "ON_CREATE_REVIEW";
export const ON_CREATE_REVIEW_INIT = "ON_CREATE_REVIEW_INIT";
export const ON_CREATE_REVIEW_SUCCESS = "ON_CREATE_REVIEW_SUCCESS";
export const ON_FETCH_PREVIOUS_REQUESTED = "ON_FETCH_PREVIOUS_REQUESTED";
export const ON_FETCH_PREVIOUS_INIT = "ON_FETCH_PREVIOUS_INIT";
export const ON_FETCH_PREVIOUS_SUCCESS = "ON_FETCH_PREVIOUS_SUCCESS";
export const ON_FETCH_PREVIOUS_FAILED = "ON_FETCH_PREVIOUS_FAILED";
export const ON_PLACE_REVIEWS_REQUESTED = "ON_PLACE_REVIEWS_REQUESTED";
export const ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT = "ON_FETCH_PREVIOUS_REVIEWS_BY_USER_ID_INIT";
export const ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS = "ON_FETCH_PREVIOUS_REVIEWS_BY_USER_ID_SUCCESS";
export const ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED = "ON_FETCH_PREVIOUS_REVIEWS_BY_USER_ID_FAILEd";
export const ON_SHOW_REVIEW_DELETION_MODAL = "ON_SHOW_REVIEW_DELETION_MODAL";
export const ON_HIDE_REVIEW_DELETION_MODAL = "ON_HIDE_REVIEW_DELETION_MODAL";
export const ON_DESTROY_REVIEW_VALUE = "ON_DESTROY_REVIEW_VALUE";
export const ON_DELETE_REVIEWS_BY_PLACE_ID = "ON_DELETE_REVIEWS_BY_PLACE_ID";
export const ON_DELETE_REVIEWS_BY_PLACE_ID_SUCCESS = "ON_DELETE_REVIEWS_BY_PLACE_ID_SUCCESS";
export const ON_DELETE_REVIEWS_BY_PLACE_ID_FAILED = "ON_DELETE_REVIEWS_BY_PLACE_ID_FAILED";
export const ON_UPDATE_REVIEW = "ON_UPDATE_REVIEW_VALUE";
export const ON_UPDATE_REVIEW_SUCCESS = "ON_UPDATE_REVIEW_SUCCESS";
export const ON_UPDATE_REVIEW_FAILED = "ON_UPDATE_REVIEW_FAILED";
export const ON_CREATE_REVIEW_UNAUTHENTICATED = "ON_CREATE_REVIEW_UNAUTHENTICATED";

export function onCreateReview(reviewBody) {
    return {
        type: ON_CREATE_REVIEW,
        payload: reviewBody
    }
}

export function onFetchPreviousRequested(placeId) {
    return {
        type: ON_FETCH_PREVIOUS_REQUESTED,
        payload: placeId
    }
}

export function onPlaceReviewsRequested(payload) {
    return {
        type: ON_PLACE_REVIEWS_REQUESTED,
        payload: payload
    }
}

export function onFetchReviewsByUser(payload) {
    return {
        type: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT,
        payload: payload
    }
}

export function onShowReviewDeletionModal(id) {
    return {
        type: ON_SHOW_REVIEW_DELETION_MODAL,
        payload: id
    }
}

export function onHideReviewDeletionModal() {
    return {
        type: ON_HIDE_REVIEW_DELETION_MODAL,
    }
}

export function onDeleteReviewsByPlaceId(placeId) {
    return {
        type: ON_DELETE_REVIEWS_BY_PLACE_ID,
        payload: placeId
    }
}

export function onUpdateReview(review) {
    return {
        type: ON_UPDATE_REVIEW,
        payload: review,
    }
}

export function onCreateReviewUnauthenticated() {
    return {
        type: ON_CREATE_REVIEW_UNAUTHENTICATED,
    }
}