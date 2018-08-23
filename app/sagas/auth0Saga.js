import { call, put, takeEvery } from 'redux-saga/effects';
import { ON_AUTH0_SUCCESS, ON_ACCOUNT_INFORMATION_REQUESTED } from "../actions/account";
import UserService from "../api/UserService";

function* auth0(action) {
    const credentials = action.payload;
    yield call(UserService.setTokens, credentials);
    yield put({ type: ON_ACCOUNT_INFORMATION_REQUESTED });
}

export const watchAuth0Requests = [
    takeEvery(ON_AUTH0_SUCCESS, auth0),
];