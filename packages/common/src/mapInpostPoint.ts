import type { InpostPointData } from '@nzyme/apis/inpost';

import type { PickupPoint } from './PickupPoint.js';

/**
 * Maps Inpost point data to a pickup point.
 */
export function mapInpostPoint(point: InpostPointData): PickupPoint {
    const id = point.name;
    const city = point.address_details.city;
    const distance = point.distance ?? undefined;

    let address = point.address_details.street;
    if (point.address_details.flat_number) {
        address += ` ${point.address_details.building_number}/${point.address_details.flat_number}`;
    } else {
        address += ` ${point.address_details.building_number}`;
    }

    return {
        type: 'inpost',
        id,
        name: point.name,
        city,
        address,
        distance,
        location: {
            lat: point.location.latitude,
            lng: point.location.longitude,
        },
    };
}
