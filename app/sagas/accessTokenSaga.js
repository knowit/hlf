import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ACCESS_TOKEN_INIT,
    ACCESS_TOKEN_SUCCESS,
    ACCESS_TOKEN_FAILED,
    AUTH0_INIT,
    ACCOUNT_INFORMATION_REQUESTED
} from "../actions/actionTypes";
import UserService from "../api/UserService";

console.log("inside access token saga");

function* accessTokenRequestWorker() {
    console.log("inside access token saga worker");
    const payload = yield call(UserService.getTokenFromStorage);

    if(payload) {
        console.log("payload: ", payload);
        yield put({ type: ACCOUNT_INFORMATION_REQUESTED, payload });
    } else {
        console.log("did not find token");
        yield put({ type: ACCESS_TOKEN_FAILED });
    }
}

export const watchAccessTokenRequests = [
    takeEvery(ACCESS_TOKEN_INIT, accessTokenRequestWorker),
];