console.log("inside rootSaga.js");

import { watchAccountInformationRequests } from './accountSagas';
import { watchAccessTokenRequests } from './accessTokenSaga';
import { watchAuth0Requests } from './auth0Saga';
import { watchReviewSagas } from './reviewSagas';
import { watchVenueSagas } from './venueSagas';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
            ...watchAccessTokenRequests,
            ...watchAuth0Requests,
            ...watchAccountInformationRequests,
            ...watchReviewSagas,
            ...watchVenueSagas,
    ]);
}
