import { call, put, takeEvery } from 'redux-saga/effects';
import { ON_AUTH0_SUCCESS, ON_ACCOUNT_INFORMATION_REQUESTED } from "../actions/account";
import UserService from "../api/UserService";

function* auth0(action) {
    try {
        const credentials = action.payload;
        yield call(UserService.setTokens, credentials);
        yield put({ type: ON_ACCOUNT_INFORMATION_REQUESTED });
    } catch(e) {
        console.log("auth0 bleh");
    }
}

export const watchAuth0Requests = [
    takeEvery(ON_AUTH0_SUCCESS, auth0),
];