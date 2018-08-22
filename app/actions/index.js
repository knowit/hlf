import * as actions from './actionTypes';

export function auth0Success(credentials) {
    return {
        type: actions.AUTH0_SUCCESS, payload: credentials
    }
}

export function accessTokenInit() {
    return {
        type: actions.ACCESS_TOKEN_INIT
    }
}

export function signOut() {
    return {
        type: actions.SIGN_OUT
    }
}

export function fetchPreviousRequested(placeId) {
    return {
        type: actions.FETCH_PREVIOUS_REQUESTED,
        payload: placeId
    }
}

export function requestVenueInformation(venue) {
    return {
        type: actions.VENUE_INFORMATION_REQUESTED,
        payload: venue,
    }
}

export function venueDeselected() {
    return {
        type: actions.VENUE_DESELECTED
    }
}

export function placeReviewsRequested(placeId) {
    return {
        type: actions.PLACE_REVIEWS_REQUESTED,
        payload: placeId
    }
}

export function createReview(reviewBody) {
    return {
        type: actions.CREATE_REVIEW,
        payload: reviewBody
    }
}