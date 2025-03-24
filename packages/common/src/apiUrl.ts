import { API_URL } from './constants.js';

declare global {
    let PACZKOAPI_API_URL: string | undefined;
}

/**
 * Get the API URL
 */
export function getApiUrl() {
    return typeof PACZKOAPI_API_URL === 'string' ? PACZKOAPI_API_URL : API_URL;
}

/**
 * Set the API URL
 */
export function setApiUrl(url: string) {
    (global as Record<string, unknown>).PACZKOAPI_API_URL = url;
}
