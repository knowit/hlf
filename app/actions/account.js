export const ON_AUTH0_SUCCESS = "ON_AUTH0_SUCCESS";
export const ON_ACCOUNT_INFORMATION_REQUESTED = "ON_ACCOUNT_INFORMATION_REQUESTED";
export const ON_ACCOUNT_INFORMATION_FAILED = "ON_ACCOUNT_INFORMATION_FAILED";
export const ON_ACCESS_TOKEN_INIT = "ON_ACCESS_TOKEN_INIT";
export const ON_ACCESS_TOKEN_SUCCESS = "ON_ACCESS_TOKEN_SUCCESS";
export const ON_ACCESS_TOKEN_FAILED = "ON_ACCESS_TOKEN_FAILED";
export const ON_LOGIN_SUCCESS = "ON_LOGIN_SUCCESS";
export const ON_SIGN_OUT = "ON_SIGN_OUT";

export function onAuth0Success() {
    return {
        type: ON_AUTH0_SUCCESS
    }
}

export function onAccountInformationRequested() {
    return {
        type: ON_ACCOUNT_INFORMATION_REQUESTED
    }
}

export function onAccountInformationFailed() {
    return {
        type: ON_ACCOUNT_INFORMATION_FAILED
    }
}

export function onAccessTokenInit() {
    return {
        type: ON_ACCESS_TOKEN_INIT
    }
}

export function onAccessTokenSuccess() {
    return {
        type: ON_ACCESS_TOKEN_SUCCESS
    }
}

export function onAccessTokenFailed() {
    return {
        type: ON_ACCESS_TOKEN_FAILED
    }
}

export function onLoginSuccess() {
    return {
        type: ON_LOGIN_SUCCESS
    }
}

export function onSignOut() {
    return {
        type: ON_SIGN_OUT
    }
}