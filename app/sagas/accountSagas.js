import {
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_LOGIN_SUCCESS,
    ON_ACCOUNT_INFORMATION_FAILED, ON_SIGN_OUT
} from "../actions/account";

import { call, put, takeEvery } from 'redux-saga/effects';
import UserService from '../api/UserService';
import {AsyncStorage} from "react-native";

// worker Saga: will be fired on ACCOUNT_INFORMATION_REQUESTED actionsOld
function* fetchAccountInformation() {
    try {

        const token = yield call(AsyncStorage.getItem, "access_token");
        const result = yield call(UserService.getAccountInformation, token);

        if(result.status === 200) {
            yield put({ type: ON_LOGIN_SUCCESS, payload: result.data });
        } else {
            yield put({ type: ON_ACCOUNT_INFORMATION_FAILED });
        }

    } catch(e) {
        if(e.response && e.response.status === 401) {
            yield put({ type: ON_SIGN_OUT });
        } else if((e.response && e.response.status === 408) || (e.code && e.code === 'ECONNABORTED')) {
            // Todo - handle timeout error
        } else {
            yield put({ type: ON_ACCOUNT_INFORMATION_FAILED });
        }
    }
}

export const watchAccountInformationRequests = [
    takeEvery(ON_ACCOUNT_INFORMATION_REQUESTED, fetchAccountInformation),
];