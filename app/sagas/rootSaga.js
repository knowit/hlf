console.log("inside rootSaga.js");

import { watchAccountInformationRequests } from './accountSagas';
import { watchReviewByPlaceIdRequests } from './reviewSagas';
import { selectVenueSaga, deselectVenueSaga } from './venueSagas';
import { watchAccessTokenRequests } from './accessTokenSaga';
import { watchAuth0Requests } from './auth0Saga';

import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all(
        fork(watchAccessTokenRequests),
        fork(watchAuth0Requests),
        fork(watchAccountInformationRequests),
        fork(watchReviewByPlaceIdRequests),
        fork(selectVenueSaga),
        fork(deselectVenueSaga)
    );
}
