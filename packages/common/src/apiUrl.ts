import { API_URL } from './constants.js';

let apiUrl = API_URL;

declare const window: undefined | { PACZKOAPI_API_URL?: string };

/**
 * Get the API URL
 */
export function getApiUrl() {
    if (typeof window !== 'undefined' && window.PACZKOAPI_API_URL) {
        return window.PACZKOAPI_API_URL;
    }

    return apiUrl;
}

/**
 * Set the API URL
 */
export function setApiUrl(url: string) {
    apiUrl = url;

    if (typeof window !== 'undefined') {
        window.PACZKOAPI_API_URL = url;
    }
}

/**
 * Set the API URL to the local server
 */
export function setApiLocal(port?: number) {
    setApiUrl(`http://localhost:${port ?? 3000}`);
}
