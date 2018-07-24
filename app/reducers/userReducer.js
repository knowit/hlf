import { LOGIN_INIT, LOGIN_FAILED, LOGIN_SUCCESS, SIGNOUT } from "../actions/";

export default (
  state = { isAuthenticated: false, hasCompletedInitialLoginAttempt: false },
  action
) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { isAuthenticated: false, hasCompletedInitialLoginAttempt: false };
    case LOGIN_FAILED:
      return { isAuthenticated: false, hasCompletedInitialLoginAttempt: true };
    case LOGIN_SUCCESS:
      return { isAuthenticated: true, hasCompletedInitialLoginAttempt: true };
    case SIGNOUT:
      return { isAuthenticated: false, hasCompletedInitialLoginAttempt: true };
    default:
      return state;
  }
};
