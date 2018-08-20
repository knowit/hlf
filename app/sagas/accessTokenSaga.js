import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ACCESS_TOKEN_INIT,
    ACCESS_TOKEN_FAILED,
    ACCOUNT_INFORMATION_REQUESTED
} from "../actions/actionTypes";
import UserService from "../api/UserService";

function* accessTokenRequestWorker() {
    const token = yield call(UserService.getTokenFromStorage);

    if(token) {
        yield put({ type: ACCOUNT_INFORMATION_REQUESTED, payload: token });
    } else {
        yield put({ type: ACCESS_TOKEN_FAILED });
    }
}

export const watchAccessTokenRequests = [
    takeEvery(ACCESS_TOKEN_INIT, accessTokenRequestWorker),
];