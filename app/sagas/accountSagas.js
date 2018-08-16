import {
    ACCOUNT_INFORMATION_REQUESTED,
    LOGIN_SUCCESS,
    ACCOUNT_INFORMATION_FAILED
} from "../actions/actionTypes";

import { call, put, takeEvery } from 'redux-saga/effects';
import UserService from '../api/UserService';

console.log("inside accountSagas.js");

// worker Saga: will be fired on ACCOUNT_INFORMATION_REQUESTED actionsOld
function* fetchAccountInformation() {
    try {

        console.log("inside accountSagas.fetchAccountInformation");
        const token = yield call(UserService.checkOfflineStorage);
        const result = yield call(UserService.getAccountInformation, token);

        console.log("result: ", result);

        if(result.status === 200) {
            yield put({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
            yield put({ type: ACCOUNT_INFORMATION_FAILED });
        }

    } catch(e) {
        console.log("error fetching account information: ", e.message);
        yield put({ type: ACCOUNT_INFORMATION_FAILED });
    }
}

/*
    Starts fetchUser on each dispatched 'ACCOUNT_INFORMATION_REQUESTED' action.
    Allows concurrent fetches of user.
 */
export const watchAccountInformationRequests = [
    takeEvery(ACCOUNT_INFORMATION_REQUESTED, fetchAccountInformation),
];