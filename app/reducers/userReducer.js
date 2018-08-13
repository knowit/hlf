import {
    LOGIN_INIT,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGN_OUT,
    ACCOUNT_INFORMATION_REQUESTED,
    AUTH0_SUCCESS
} from "../actions/";

export default (
  state = {
    isAuthenticated: false,
    hasCompletedInitialLoginAttempt: false,
    user: {}
  },
  action
) => {
  switch (action.type) {
    case AUTH0_SUCCESS:
        return {
            isAuthenticated: false,
            hasCompletedInitialLoginAttempt: false,
            user: {}
        };
    case ACCOUNT_INFORMATION_REQUESTED:
      console.log("ACCOUNT_INFORMATION_REQUESTED...");
      return {
          isAuthenticated: true,
          hasCompletedInitialLoginAttempt: true,
          user: {}
      };
    case LOGIN_INIT:
      return {
        isAuthenticated: false,
        hasCompletedInitialLoginAttempt: false,
        user: {}
      };
    case LOGIN_FAILED:
      return {
        isAuthenticated: false,
        hasCompletedInitialLoginAttempt: true,
        user: {}
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        hasCompletedInitialLoginAttempt: true,
        user: action.payload
      };
    case SIGN_OUT:
      return {
        isAuthenticated: false,
        hasCompletedInitialLoginAttempt: true,
        user: {}
      };
    default:
      return state;
  }
};
