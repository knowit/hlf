import { LOGIN_INIT, LOGIN_FAILED, LOGIN_SUCCESS, SIGNOUT } from "../actions/";

export default (
  state = {
    isAuthenticated: false,
    hasCompletedInitialLoginAttempt: false,
    user: {}
  },
  action
) => {
  switch (action.type) {
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
      console.log("hei");
      return {
        isAuthenticated: true,
        hasCompletedInitialLoginAttempt: true,
        user: action.payload
      };
    case SIGNOUT:
      return {
        isAuthenticated: false,
        hasCompletedInitialLoginAttempt: true,
        user: {}
      };
    default:
      return state;
  }
};
