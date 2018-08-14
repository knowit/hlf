import { call, put, takeEvery } from 'redux-saga/effects';
import {ACCESS_TOKEN_INIT, ACCESS_TOKEN_SUCCESS, ACCESS_TOKEN_FAILED, AUTH0_INIT} from "../actions/actionTypes";
import UserService from "../api/UserService";

console.log("inside access token saga");

function* accessTokenRequestWorker() {
    console.log("inside access token saga worker");
    const token = yield call(UserService.checkOfflineStorage);
    yield put({ type: ACCESS_TOKEN_SUCCESS, payload: token });
}

export function* watchAccessTokenRequests() {
    yield takeEvery(ACCESS_TOKEN_INIT, accessTokenRequestWorker);
}