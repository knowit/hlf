import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { AUTH0_SUCCESS, ACCOUNT_INFORMATION_REQUESTED } from "../actions/actionTypes";
import { AsyncStorage } from "react-native";

/*const saveTokens = credentials => {
    AsyncStorage.setItem("access_token", credentials.accessToken);
    AsyncStorage.setItem("id_token", credentials.idToken);
    AsyncStorage.setItem("refresh_token", credentials.refreshToken);
};*/

console.log("inside auth0 saga");

function* auth0(action) {
    console.log("inside auth0 worker");
    const credentials = action.payload;
    console.log("credentials: ", credentials);
   /* yield call(AsyncStorage.setItem, ["access_token", credentials.accessToken]);
    yield call(AsyncStorage.setItem, ["id_token", credentials.idToken]);
    yield call(AsyncStorage.setItem, ["refresh_token", credentials.refreshToken]);*/

    yield put({ type: ACCOUNT_INFORMATION_REQUESTED });
}

export function* watchAuth0Requests() {
    yield takeEvery(AUTH0_SUCCESS, auth0);
}