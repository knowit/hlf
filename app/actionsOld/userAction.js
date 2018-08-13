export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SIGNOUT = "SIGNOUT";

import { AsyncStorage } from "react-native";
import axios from "axios";
import { ROOT_API_URL } from "../settings/endpoints";

export const checkOfflineStorage = () => {
  return dispatch => {
    dispatch({ type: LOGIN_INIT });
    AsyncStorage.getItem("access_token")
      .then(storedValue => {

        if (!storedValue) {
          dispatch({ type: LOGIN_FAILED });
        } else {

            console.log("storage value: ", storedValue);

          axios
            .get(`${ROOT_API_URL}/brukere/login`, {
              headers: {
                Authorization: "Bearer " + storedValue
              }
            })
            .then(result => {

                if (result.status === 200) {
                  dispatch({ type: LOGIN_SUCCESS, payload: result.data });
              } else {
                  dispatch({ type: LOGIN_FAILED });
              }
            })
            .catch(() => {
                dispatch({ type: LOGIN_FAILED });
            });
        }
      })
      .catch(() => {
          dispatch({ type: LOGIN_FAILED });
      });
  };
};

export const loginSuccessful = accessToken => {
  return async dispatch => {
    axios
      .get(`${ROOT_API_URL}/brukere/login`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
      .then(result => {
        if (result.status === 200) {
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        }
      });
  };
};

export const signout = () => {
  return dispatch => {
    AsyncStorage.multiRemove([
      "access_token",
      "id_token",
      "refresh_token"
    ]).then(dispatch({ type: SIGNOUT }));
  };
};
