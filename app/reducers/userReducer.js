import {
    ACCOUNT_INFORMATION_REQUESTED,
    ACCOUNT_INFORMATION_FAILED,
    ACCESS_TOKEN_INIT,
    ACCESS_TOKEN_SUCCESS,
    ACCESS_TOKEN_FAILED,
    AUTH0_SUCCESS,
    LOGIN_SUCCESS,
    SIGN_OUT,
} from "../actions/actionTypes";

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
        case ACCOUNT_INFORMATION_REQUESTED:
            return {
                isAuthenticated: true,
                hasCompletedInitialLoginAttempt: true,
                user: {},
                pending: true,
            };
        case ACCOUNT_INFORMATION_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
            };
        case ACCESS_TOKEN_INIT:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: false,
                token: null,
                pending: true,
            };
        case ACCESS_TOKEN_SUCCESS:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                token: action.payload,
                user: {},
                pending: true,
            };
        case ACCESS_TOKEN_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
            };
        case AUTH0_SUCCESS:
            return {
                isAuthenticated: true,
                hasCompletedInitialLoginAttempt: true,
                credentials: action.payload,
                pending: true,
            };
        case LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                hasCompletedInitialLoginAttempt: true,
                user: action.payload,
                pending: false
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
