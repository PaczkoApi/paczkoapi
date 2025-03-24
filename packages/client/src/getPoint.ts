import { API_URL_POINTS, getApiUrl } from '@paczkoapi/common';

import { fetchApi } from './fetchApi.js';
import type { PickupPoint, PickupPointType } from './types.js';

/**
 * Get a point by type and name.
 *
 * @param pointType - Type of the point
 * @param pointName - Name of the point
 *
 * @example getPoint('inpost', 'WAW123')
 */
export function getPoint(pointType: PickupPointType, pointName: string) {
    const url = `${getApiUrl()}${API_URL_POINTS}/${pointType}/${pointName}`;
    return fetchApi<PickupPoint | null>(url.toString());
}
