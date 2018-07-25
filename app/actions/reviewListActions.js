export const FETCH_REVIEWS_INIT = "";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";

import { fetchAccessToken } from "./";
import axios from "axios";
import { SIGNOUT } from "./userAction";

export const fetchReviews = place_id => {
  return async dispatch => {
    dispatch({ type: FETCH_REVIEWS_INIT });
    const token = await fetchAccessToken();
    axios
      .get(`/vurderinger/placeId/${place_id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          dispatch({ type: SIGNOUT });
        } else if (response.status === 404) {
          dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: [] });
        }
      });
  };
};
