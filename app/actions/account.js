export const ON_AUTH0_SUCCESS = "ON_AUTH0_SUCCESS";
export const ON_ACCOUNT_INFORMATION_REQUESTED = "ON_ACCOUNT_INFORMATION_REQUESTED";
export const ON_ACCOUNT_INFORMATION_FAILED = "ON_ACCOUNT_INFORMATION_FAILED";
export const ON_ACCESS_TOKEN_INIT = "ON_ACCESS_TOKEN_INIT";
export const ON_ACCESS_TOKEN_SUCCESS = "ON_ACCESS_TOKEN_SUCCESS";
export const ON_ACCESS_TOKEN_FAILED = "ON_ACCESS_TOKEN_FAILED";
export const ON_LOGIN_SUCCESS = "ON_LOGIN_SUCCESS";
export const ON_SIGN_OUT = "ON_SIGN_OUT";
export const ON_LOGIN_VIEW_REQUESTED = "ON_LOGIN_VIEW_REQUESTED";
export const ON_AUTH0_CANCELLED = "ON_AUTH0_CANCELLED";
export const ON_ACCOUNT_DELETION_INIT = "ON_ACCOUNT_DELETION_INIT";
export const ON_ACCOUNT_DELETION_SUCCESS = "ON_ACCOUNT_DELETION_SUCCESS";
export const ON_SHOW_ACCOUNT_DELETION_MODAL = "ON_SHOW_ACCOUNT_DELETION_MODAL";
export const ON_HIDE_ACCOUNT_DELETION_MODAL = "ON_HIDE_ACCOUNT_DELETION_MODAL";
export const ON_ACCOUNT_DELETION_FAILED = "ON_ACCOUNT_DELETION_FAILED";

export function onAuth0Success(credentials) {
    return {
        type: ON_AUTH0_SUCCESS,
        payload: credentials
    }
}

export function onAccessTokenInit() {
    return {
        type: ON_ACCESS_TOKEN_INIT
    }
}

export function onSignOut() {
    return {
        type: ON_SIGN_OUT
    }
}

export function onLoginViewRequested() {
    return {
        type: ON_LOGIN_VIEW_REQUESTED
    }
}

export function onAuth0Cancelled() {
    return {
        type: ON_AUTH0_CANCELLED
    }
}

export function onAccountDeletionInit() {
    return {
        type: ON_ACCOUNT_DELETION_INIT
    }
}

export function onAccountDeletionSuccess() {
    return {
        type: ON_ACCOUNT_DELETION_SUCCESS
    }
}

export function onAccountDeletionFailed() {
    return {
        type: ON_ACCOUNT_DELETION_FAILED
    }
}

export function onShowAccountDeletionModal() {
    return {
        type: ON_SHOW_ACCOUNT_DELETION_MODAL
    }
}

export function onHideAccountDeletionModal() {
    return {
        type: ON_HIDE_ACCOUNT_DELETION_MODAL
    }
}