import axios from "axios";
import {ROOT_API_URL} from "../settings/endpoints";
import * as actions from './actionTypes';

export function auth0Init() {
    return {
        type: actions.AUTH0_INIT
    }
}

export function auth0Success(credentials) {
    return {
        type: actions.AUTH0_SUCCESS, payload: credentials
    }
}

export function auth0Failed() {
    return {
        type: actions.AUTH0_FAILED
    }
}

export function accessTokenInit() {
    return {
        type: actions.ACCESS_TOKEN_INIT
    }
}

export function accessTokenSuccess() {
    return {
        type: actions.ACCESS_TOKEN_SUCCESS
    }
}

export function accessTokenFailed() {
    return {
        type: actions.ACCESS_TOKEN_FAILED
    }
}



export function accountInformationRequested() {

    console.log("account information requested!");

    return {
        type: actions.ACCOUNT_INFORMATION_REQUESTED
    }
}

export function loginInit() {
    return {
        type: actions.LOGIN_INIT
    }
}

export function loginSuccess() {
    return {
        type: actions.LOGIN_SUCCESS
    }
}

export function loginFailed() {
    return {
        type: actions.LOGIN_FAILED
    }
}

export function signOut() {
    return {
        type: actions.SIGN_OUT
    }
}

export function fetchReviewsInit() {
    return {
        type: actions.FETCH_REVIEWS_INIT
    }
}

export function fetchReviewsSuccess() {
    return {
        type: actions.FETCH_REVIEWS_SUCCESS
    }
}

export function createReviewInit() {
    return {
        type: actions.CREATE_REVIEW_INIT
    }
}

export function createReviewSuccess() {
    return {
        type: actions.CREATE_REVIEW_SUCCESS
    }
}

export function fetchPreviousInit() {
    return {
        type: actions.FETCH_PREVIOUS_INIT
    }
}

export function fetchPreviousSuccess() {
    return {
        type: actions.FETCH_PREVIOUS_SUCCESS
    }
}

export function fetchPreviousFailed() {
    return {
        type: actions.FETCH_PREVIOUS_FAILED
    }
}

export function fetchPreviousReviews() {
    return {
        type: actions.FETCH_PREVIOUS
    }
}

export function venueSelected() {
    return {
        type: actions.VENUE_SELECTED
    }
}

export function venueDeselected() {
    return {
        type: actions.VENUE_DESELECTED
    }
}

export function placeReviewsRequested() {
    return {
        type: actions.PLACE_REVIEWS_REQUESTED
    }
}

export function createReview(reviewBody) {
    return {
        type: actions.CREATE_REVIEW,
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
                    dispatch({ type: actions.LOGIN_SUCCESS, payload: result.data });
                }
            });
    };
};

export function checkOfflineStorage() {
    return {
        type: actions.CHECK_OFFLINE_STORAGE
    }
}