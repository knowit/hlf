import {AUTH0_SUCCESS} from "../actions";

console.log("inside accountSagas.js");

import { call, put, takeEvery } from 'redux-saga/effects';
import UserService from '../api/UserService';

import * as actions from '../actions';

// worker Saga: will be fired on ACCOUNT_INFORMATION_REQUESTED actionsOld
function* fetchAccountInformation(action) {
    try {

        console.log("inside accountSagas.fetchAccountInformation");

        yield put({ type: actions.LOGIN_INIT });

        const token = yield call(UserService.checkOfflineStorage);
        const result = yield call(UserService.getAccountInformation, token);

        console.log("result: ", result);

        if(result.status === 200) {
            yield put({ type: actions.LOGIN_SUCCESS, payload: result.data });
        } else {
            yield put({ type: actions.LOGIN_FAILED });
        }

    } catch(e) {
        console.log("error fetching account information: ", e.message);
        yield put({ type: actions.LOGIN_FAILED });
    }
}

/*
    Starts fetchUser on each dispatched 'ACCOUNT_INFORMATION_REQUESTED' action.
    Allows concurrent fetches of user.
 */
export function* fetchAccountInformationSaga() {
    yield takeEvery(actions.AUTH0_SUCCESS, fetchAccountInformation);
}