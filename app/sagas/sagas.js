import { call, put, takeEvery } from 'redux-saga/effects';
import UserService from '../api/UserService';

// worker Saga: will be fired on ACCOUNT_FETCH_REQUESTED actions
function* fetchAccountInformation(action) {
    try {
        const token = yield call(UserService.checkOfflineStorage());
        const result = yield call(UserService.getAccountInformation(token));

        if(result.status === 200) {
            yield put({ type: "LOGIN_SUCCESS", payload: result.data });
        } else {
            yield put({ type: "LOGIN_FAILED" });
        }

    } catch(e) {
        yield put({ type: "LOGIN_FAILED" });
    }
}

/*
    Starts fetchUser on each dispatched 'ACCOUNT_FETCH_REQUESTED' action.
    Allows concurrent fetches of user.
 */
function* fetchAccountInformationSaga() {
    yield takeEvery("ACCOUNT_FETCH_REQUESTED", fetchAccountInformation);
}

export default fetchAccountInformationSaga();