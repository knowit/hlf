export const ON_FETCH_REVIEWS_INIT = "ON_FETCH_REVIEWS_INIT";
export const ON_FETCH_REVIEWS_SUCCESS = "ON_FETCH_REVIEWS_SUCCESS";
export const ON_FETCH_REVIEWS_FAILED = "ON_FETCH_REVIEWS_FAILED";
export const ON_CREATE_REVIEW = "ON_CREATE_REVIEW";
export const ON_CREATE_REVIEW_INIT = "ON_CREATE_REVIEW_INIT";
export const ON_CREATE_REVIEW_SUCCESS = "ON_CREATE_REVIEW_SUCCESS";
export const ON_FETCH_PREVIOUS_REQUESTED = "ON_FEST_PREVIOUS_REQUESTED";
export const ON_FETCH_PREVIOUS_INIT = "ON_FETCH_PREVIOUS_INIT";
export const ON_FETCH_PREVIOUS_SUCCESS = "ON_FETCH_PREVIOUS_SUCCESS";
export const ON_FETCH_PREVIOUS_FAILED = "ON_FETCH_PREVIOUS_FAILED";
export const ON_PLACE_REVIEWS_REQUESTED = "ON_PLACE_REVIEWS_REQUESTED";

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

export function onPlaceReviewsRequested() {
    return {
        type: ON_PLACE_REVIEWS_REQUESTED
    }
}

