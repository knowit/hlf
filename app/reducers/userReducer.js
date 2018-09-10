import {
    ON_ACCOUNT_INFORMATION_REQUESTED,
    ON_ACCOUNT_INFORMATION_FAILED,
    ON_ACCESS_TOKEN_INIT,
    ON_ACCESS_TOKEN_SUCCESS,
    ON_ACCESS_TOKEN_FAILED,
    ON_AUTH0_SUCCESS,
    ON_LOGIN_SUCCESS,
    ON_SIGN_OUT,
    ON_LOGIN_VIEW_REQUESTED,
} from "../actions/account";

export default (
    state = {
        isAuthenticated: true,
        hasCompletedInitialLoginAttempt: true,
        user: {},
        pending: true,
        error: '',
    },
    action
) => {
    switch (action.type) {

        case ON_ACCOUNT_INFORMATION_REQUESTED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                user: {},
                pending: true,
            };

        case ON_ACCOUNT_INFORMATION_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
            };

        case ON_ACCESS_TOKEN_INIT:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: false,
                token: null,
                pending: true,
            };

        case ON_ACCESS_TOKEN_SUCCESS:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                token: action.payload,
                user: {},
                pending: true,
            };

        case ON_ACCESS_TOKEN_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
            };

        case ON_AUTH0_SUCCESS:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                credentials: action.payload,
                pending: true,
            };

        case ON_LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                hasCompletedInitialLoginAttempt: true,
                user: action.payload,
                pending: false
            };

        case ON_SIGN_OUT:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {}
            };

        case ON_LOGIN_VIEW_REQUESTED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {},
                showLoginScreen: true,
            };

        default:
            return state;
    }
};
