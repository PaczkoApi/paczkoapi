import { API_URL_POINTS, getApiUrl } from '@paczkoapi/common';
import type { PickupPoint, Provider } from '@paczkoapi/common';

import { fetchApi } from './fetchApi.js';

/**
 * Parameters for getting a point by type and ID.
 */
export interface GetPointParams {
    /**
     * Type of the point
     *
     * @example 'inpost'
     */
    type: Provider;
    /**
     * ID of the point
     *
     * @example 'WAW123'
     */
    id: string;
}

/**
 * Get a point by type and name.
 *
 * @param params - Parameters for getting a point by type and ID.
 *
 * @example getPoint({ type: 'inpost', id: 'WAW123' })
 */
export function getPickupPoint(params: GetPointParams) {
    const url = `${getApiUrl()}${API_URL_POINTS}/${params.type}/${params.id}`;
    return fetchApi<PickupPoint | null>(url.toString());
}
