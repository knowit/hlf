console.log("inside rootSaga.js");

import { fetchAccountInformationSaga } from './accountSagas';
import { fetchReviewByPlaceId } from './reviewSagas';
import { selectVenueSaga, deselectVenueSaga } from './venueSagas';

import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all(
        fork(fetchAccountInformationSaga),
        fork(fetchReviewByPlaceId),
        fork(selectVenueSaga),
        fork(deselectVenueSaga)
    );
}
