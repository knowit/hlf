import {
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_LOGIN_SUCCESS,
    ON_ACCOUNT_INFORMATION_FAILED,
    ON_SIGN_OUT,
    ON_ACCOUNT_DELETION_INIT,
    ON_ACCOUNT_DELETION_SUCCESS,
    ON_ACCOUNT_DELETION_FAILED
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
        } else if((e.response && e.response.status === 408) || (e.code && e.code === 'ECONNABORTED')) {
            // Todo - handle timeout error
        } else {
        }

        yield put({ type: ON_ACCOUNT_INFORMATION_FAILED });

    }
}

function* deleteMyAccount() {

    try {
        const result = yield call(UserService.deleteMyAccount);

        if(result.status === 200) {
            yield call(UserService.removeTokens);
            yield put({ type: ON_ACCOUNT_DELETION_SUCCESS });
        } else {
            yield put({ type: ON_ACCOUNT_DELETION_FAILED });
        }

    } catch(e) {
        yield put({ type: ON_ACCOUNT_DELETION_FAILED });
    }
}

function* handleOnAccountInformationFailed() {
    yield call(UserService.removeTokens);
}

export const watchAccountInformationRequests = [
    takeEvery(ON_ACCOUNT_INFORMATION_REQUESTED, fetchAccountInformation),
    takeEvery(ON_ACCOUNT_DELETION_INIT, deleteMyAccount),
    takeEvery(ON_ACCOUNT_INFORMATION_FAILED, handleOnAccountInformationFailed)
];

