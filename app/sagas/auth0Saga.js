import { call, put, takeEvery } from 'redux-saga/effects';
import { AUTH0_SUCCESS, ACCOUNT_INFORMATION_REQUESTED } from "../actions/actionTypes";
import UserService from "../api/UserService";

function* auth0(action) {
    const credentials = action.payload;
    yield call(UserService.setTokens, credentials);
    yield put({ type: ACCOUNT_INFORMATION_REQUESTED });
}

export const watchAuth0Requests = [
    takeEvery(AUTH0_SUCCESS, auth0),
];