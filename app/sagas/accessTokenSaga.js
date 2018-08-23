import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ON_ACCESS_TOKEN_INIT,
    ON_ACCESS_TOKEN_FAILED,
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_SIGN_OUT
} from "../actions/account";
import UserService from "../api/UserService";

function* accessTokenRequestWorker() {
    const token = yield call(UserService.getTokenFromStorage);

    if(token) {
        yield put({ type: ON_ACCOUNT_INFORMATION_REQUESTED, payload: token });
    } else {
        yield put({ type: ON_ACCESS_TOKEN_FAILED });
    }
}

function* signOut() {
    yield call(UserService.signOut);
}

export const watchAccessTokenRequests = [
    takeEvery(ON_ACCESS_TOKEN_INIT, accessTokenRequestWorker),
    takeEvery(ON_SIGN_OUT, signOut),
];