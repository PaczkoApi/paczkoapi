import { ApiError } from '@paczkoapi/common';

/**
 * Fetch data from the API.
 */
export async function fetchApi<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
        if (response.status === 400) {
            const data = (await response.json()) as {
                errors: string[];
                message: string;
            };
            throw new ApiError(data.message, response.status, data.errors, response);
        }

        const error = await response.text();
        const message = 'Failed to fetch API';
        throw new ApiError(message, response.status, [error], response);
    }

    const data = await response.json();
    return data as T;
}
