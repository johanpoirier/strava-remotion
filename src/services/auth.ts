import {ACCESS_TOKEN_KEY, TOKEN_EXPIRATION_KEY} from '../tools/constants';

export function isLoggedIn() {
    return !isTokenExpired() && !!localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function isTokenExpired() {
    const expiresAt = 1000 * parseInt(localStorage.getItem(TOKEN_EXPIRATION_KEY) ?? '0', 10);
    if (Date.now() > expiresAt) {
        localStorage.clear();
        return true;
    }
    return false;
}