import {
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_LOGIN_SUCCESS,
    ON_ACCOUNT_INFORMATION_FAILED
} from "../actions/account";

import { call, put, takeEvery } from 'redux-saga/effects';
import UserService from '../api/UserService';

// worker Saga: will be fired on ACCOUNT_INFORMATION_REQUESTED actionsOld
function* fetchAccountInformation() {
    try {

        const token = yield call(UserService.getTokenFromStorage);
        const result = yield call(UserService.getAccountInformation, token);

        if(result.status === 200) {
            yield put({ type: ON_LOGIN_SUCCESS, payload: result.data });
        } else {
            yield put({ type: ON_ACCOUNT_INFORMATION_FAILED });
        }

    } catch(e) {
        yield put({ type: ON_ACCOUNT_INFORMATION_FAILED });
    }
}

export const watchAccountInformationRequests = [
    takeEvery(ON_ACCOUNT_INFORMATION_REQUESTED, fetchAccountInformation),
];