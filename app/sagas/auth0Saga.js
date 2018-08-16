import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { AUTH0_SUCCESS, ACCOUNT_INFORMATION_REQUESTED } from "../actions/actionTypes";
import { AsyncStorage } from "react-native";
import UserService from "../api/UserService";

/*const saveTokens = credentials => {
    AsyncStorage.setItem("access_token", credentials.accessToken);
    AsyncStorage.setItem("id_token", credentials.idToken);
    AsyncStorage.setItem("refresh_token", credentials.refreshToken);
};*/

console.log("inside auth0 saga");

function* auth0(action) {
    console.log("inside auth0 worker, action: ", action);

    if(action.payload) {
        const credentials = action.payload;
        console.log("credentials: ", credentials);
        yield call(UserService.setTokens, credentials);
        yield put({ type: ACCOUNT_INFORMATION_REQUESTED });
    }
}

export const watchAuth0Requests = [
    takeEvery(AUTH0_SUCCESS, auth0),
];