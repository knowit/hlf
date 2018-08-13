import authenticated  from './authenticated';
import {ROOT_API_URL} from "../settings/endpoints";
import _ from "lodash";
export const CREATE_REVIEW_INIT = "CREATE_REVIEW_INIT";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";

export const FETCH_PREVIOUS_INIT = "FETCH_PREVIOUS_INIT";
export const FETCH_PREVIOUS_SUCCESS = "FETCH_PREVIOUS_SUCCESS";
export const FETCH_PREVIOUS_FAILED = "FETCH_PREVIOUS_FAILED";

export default {

    fetchMyPreviousReviews(placeId) {
        authenticated.get(`${ROOT_API_URL}/vurderinger/place/${placeId}/bruker`).then(response => {
            const grouped = _.groupBy(response.data, "type");
            const groupWithOnlyMaxId = _.map(grouped, type => {
                return type.reduce((a, b) => {
                    return a.id > b.id ? a : b;
                });
            });

            return groupWithOnlyMaxId;
        });
    },

    fetchReviews(placeId) {
        authenticated.get(`${ROOT_API_URL}/vurderinger/place/${placeId}`).then((data) => {
            return data;
        });
    },

    createReview() {

    },

}