import type { PickupPoint, Provider } from '@paczkoapi/common';
import { API_URL_POINTS, ApiError, getApiUrl, parseProviders } from '@paczkoapi/common';

import { fetchApi } from './fetchApi.js';

/**
 * Find nearest points input
 */
export interface FindNearestPointsInput {
    /**
     * Type of the pickup points.
     * If not provided, all types will be used.
     *
     * You can provide a single type or an array of types.
     *
     * @example "inpost"
     * @example ["inpost", "dpd"]
     */
    type?: Provider | Provider[];

    /**
     * City name
     * @example "Warszawa"
     */
    city: string;

    /**
     * Postal code
     * @example "00-000"
     */
    postalCode?: string;

    /**
     * Address including street name and number.
     * @example "ul. Jana Pawła II 1"
     */
    street: string;

    /**
     * Limit the number of points returned.
     * @example 10
     * @default 5
     */
    limit?: number;

    /**
     * Abort signal
     */
    signal?: AbortSignal;
}

/**
 * Find nearest points to the given address.
 */
export async function findNearestPoints(input: FindNearestPointsInput) {
    const url = new URL(API_URL_POINTS, getApiUrl());

    if (input.type) {
        const providers = parseProviders(input.type);
        if (providers.length === 0) {
            url.searchParams.set('type', providers.join(','));
        }
    }

    if (!input.city) {
        throw new ApiError('City is required', 400, ['City is required']);
    }

    if (!input.street) {
        throw new ApiError('Address is required', 400, ['Address is required']);
    }

    url.searchParams.set('city', input.city.toLowerCase());
    url.searchParams.set('street', input.street.toLowerCase());

    if (input.postalCode) {
        url.searchParams.set('postalCode', input.postalCode.toLowerCase());
    }

    if (input.limit) {
        url.searchParams.set('limit', input.limit.toString());
    }

    const points = await fetchApi<PickupPoint[]>(url.toString(), {
        signal: input.signal,
    });

    return points ?? [];
}
