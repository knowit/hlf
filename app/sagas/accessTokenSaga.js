import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ON_ACCESS_TOKEN_INIT,
    ON_ACCESS_TOKEN_FAILED,
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_SIGN_OUT
} from "../actions/account";

import { AsyncStorage } from 'react-native';

import UserService from "../api/UserService";

function* accessTokenRequestWorker() {

    try {

        const token = yield call(AsyncStorage.getItem, "access_token");

        if(token) {
            yield put({ type: ON_ACCOUNT_INFORMATION_REQUESTED, payload: token });
        } else {
            yield put({ type: ON_ACCESS_TOKEN_FAILED });
        }

    } catch(e) {

        console.log("error: ", e);

    }
}

function* signOut() {
    try {
        yield call(UserService.signOut);
    } catch(e) {
        console.log("bleh");
    }
}

export const watchAccessTokenRequests = [
    takeEvery(ON_ACCESS_TOKEN_INIT, accessTokenRequestWorker),
    takeEvery(ON_SIGN_OUT, signOut),
];