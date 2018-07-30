import { fetchAccessToken } from ".";
import axios from "axios";
import { ROOT_API_URL } from "../settings/endpoints";

export const CREATE_REVIEW_INIT = "CREATE_REVIEW_INIT";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";

export const createReview = reviewBody => {
  return async dispatch => {
    const token = await fetchAccessToken();
    dispatch({ type: CREATE_REVIEW_INIT });

    axios
      .post(`${ROOT_API_URL}/vurderinger`, reviewBody, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => response)
      .catch(error => error);
  };
};
