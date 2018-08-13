import axios from "axios";
import {ROOT_API_URL} from "../settings/endpoints";

export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SIGN_OUT = "SIGN_OUT";
export const FETCH_REVIEWS_INIT = "FETCH_REVIEWS_INIT";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const CREATE_REVIEW_INIT = "CREATE_REVIEW_INIT";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
export const FETCH_PREVIOUS_INIT = "FETCH_PREVIOUS_INIT";
export const FETCH_PREVIOUS = "FETCH_PREVIOUS";
export const FETCH_PREVIOUS_SUCCESS = "FETCH_PREVIOUS_SUCCESS";
export const FETCH_PREVIOUS_FAILED = "FETCH_PREVIOUS_FAILED";
export const VENUE_SELECTED = "VENUE_SELECTED";
export const VENUE_DESELECTED = "VENUE_DESELECTED";
export const ACCOUNT_INFORMATION_REQUESTED = "ACCOUNT_INFORMATION_REQUESTED";
export const PLACE_REVIEWS_REQUESTED = "PLACE_REVIEWS_REQUESTED";
export const VENUE_INFORMATION_REQUESTED = "VENUE_INFORMATION_REQUESTED";
export const VENUE_DESELECT_REQUESTED = "VENUE_DESELECT_REQUESTED";
export const CHECK_OFFLINE_STORAGE = "CHECK_OFFLINE_STORAGE";
export const AUTH0_SUCCESS = "AUTH0_SUCCESS";

export function accountInformationRequested() {

    console.log("account information requested!");

    return {
        type: ACCOUNT_INFORMATION_REQUESTED
    }
}

export function loginInit() {
    return {
        type: LOGIN_INIT
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    }
}

export function auth0Success() {
    return {
        type: AUTH0_SUCCESS
    }
}

export function signOut() {
    return {
        type: SIGN_OUT
    }
}

export function fetchReviewsInit() {
    return {
        type: FETCH_REVIEWS_INIT
    }
}

export function fetchReviewsSuccess() {
    return {
        type: FETCH_REVIEWS_SUCCESS
    }
}

export function createReviewInit() {
    return {
        type: CREATE_REVIEW_INIT
    }
}

export function createReviewSuccess() {
    return {
        type: CREATE_REVIEW_SUCCESS
    }
}

export function fetchPreviousInit() {
    return {
        type: FETCH_PREVIOUS_INIT
    }
}

export function fetchPreviousSuccess() {
    return {
        type: FETCH_PREVIOUS_SUCCESS
    }
}

export function fetchPreviousFailed() {
    return {
        type: FETCH_PREVIOUS_FAILED
    }
}

export function fetchPreviousReviews() {
    return {
        type: FETCH_PREVIOUS
    }
}

export function venueSelected() {
    return {
        type: VENUE_SELECTED
    }
}

export function venueDeselected() {
    return {
        type: VENUE_DESELECTED
    }
}

export function placeReviewsRequested() {
    return {
        type: PLACE_REVIEWS_REQUESTED
    }
}

export function createReview(reviewBody) {
    return {
        type: CREATE_REVIEW,
        payload: reviewBody
    }
}

export const loginSuccessful = accessToken => {
    return async dispatch => {
        axios
            .get(`${ROOT_API_URL}/brukere/login`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
            .then(result => {
                if (result.status === 200) {
                    dispatch({ type: LOGIN_SUCCESS, payload: result.data });
                }
            });
    };
};

export function checkOfflineStorage() {
    return {
        type: CHECK_OFFLINE_STORAGE
    }
}