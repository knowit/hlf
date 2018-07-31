import { fetchAccessToken } from ".";
import axios from "axios";
import { ROOT_API_URL } from "../settings/endpoints";
import _ from "lodash";

export const CREATE_REVIEW_INIT = "CREATE_REVIEW_INIT";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";

export const FETCH_PREVIOUS_INIT = "FETCH_PREVIOUS_INIT";
export const FETCH_PREVIOUS_SUCCESS = "FETCH_PREVIOUS_SUCCESS";
export const FETCH_PREVIOUS_FAILED = "FETCH_PREVIOUS_FAILED";

export const fetchPreviousReviews = placeId => {
  return async dispatch => {
    const token = await fetchAccessToken();
    dispatch({ type: FETCH_PREVIOUS_INIT });
    axios
      .get(`${ROOT_API_URL}/vurderinger/place/${placeId}/bruker`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        const grouped = _.groupBy(response.data, "type");

        const groupWithOnlyMaxId = _.map(grouped, type => {
          return type.reduce((a, b) => {
            return a.id > b.id ? a : b;
          });
        });
        dispatch({ type: FETCH_PREVIOUS_SUCCESS, payload: groupWithOnlyMaxId });
      })
      .catch(() => dispatch({ type: FETCH_PREVIOUS_FAILED }));
  };
};

export const createReview = reviewBody => {
  console.log(reviewBody);
  return async dispatch => {
    const token = await fetchAccessToken();
    dispatch({ type: CREATE_REVIEW_INIT });

    axios
      .post(`${ROOT_API_URL}/vurderinger`, reviewBody, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response =>
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data })
      )
      .catch(error => error);
  };
};
