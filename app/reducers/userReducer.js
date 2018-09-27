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
    ON_AUTH0_CANCELLED,
    ON_SHOW_ACCOUNT_DELETION_MODAL,
    ON_HIDE_ACCOUNT_DELETION_MODAL,
    ON_ACCOUNT_DELETION_SUCCESS
} from "../actions/account";

export default (
    state = {
        isAuthenticated: true,
        hasCompletedInitialLoginAttempt: true,
        user: {},
        pending: true,
        error: '',
        showAccountDeletionModal: false
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
                showAccountDeletionModal: false
            };

        case ON_ACCOUNT_INFORMATION_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
                showAccountDeletionModal: false
            };

        case ON_ACCESS_TOKEN_INIT:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: false,
                token: null,
                pending: true,
                showAccountDeletionModal: false
            };

        case ON_ACCESS_TOKEN_SUCCESS:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                token: action.payload,
                user: {},
                pending: true,
                showAccountDeletionModal: false
            };

        case ON_ACCESS_TOKEN_FAILED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                error: action.payload,
                pending: false,
                showAccountDeletionModal: false
            };

        case ON_AUTH0_SUCCESS:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                credentials: action.payload,
                pending: true,
                showAccountDeletionModal: false
            };

        case ON_LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                hasCompletedInitialLoginAttempt: true,
                user: action.payload,
                pending: false,
                showAccountDeletionModal: false
            };

        case ON_SIGN_OUT:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {},
                showAccountDeletionModal: false
            };

        case ON_LOGIN_VIEW_REQUESTED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {},
                showLoginScreen: true,
                showAccountDeletionModal: false,
            };

        case ON_AUTH0_CANCELLED:
            return {
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {},
                showLoginScreen: false,
                showAccountDeletionModal: false,
            };

        case ON_ACCOUNT_DELETION_SUCCESS:

            return {
                ...state,
                isAuthenticated: false,
                hasCompletedInitialLoginAttempt: true,
                pending: false,
                user: {},
                showLoginScreen: false,
                showAccountDeletionModal: false,
            };

        case ON_SHOW_ACCOUNT_DELETION_MODAL:
            return {
                ...state, showAccountDeletionModal: true
            };

        case ON_HIDE_ACCOUNT_DELETION_MODAL:
            return {
                ...state, showAccountDeletionModal: false
            };

        default:
            return state;
    }
};
