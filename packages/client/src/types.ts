/**
 * Pickup point types
 */
export const PickupPointType = ['inpost', 'dhl'] as const;

/**
 * Pickup point type
 */
export type PickupPointType = (typeof PickupPointType)[number];

/**
 * Location of the pickup point
 */
export interface PickupPointLocation {
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    lng: number;
}

/**
 * Pickup point
 */
export interface PickupPoint {
    /**
     * Type of the pickup point
     */
    type: PickupPointType;

    /**
     * ID of the pickup point
     */
    id: string;

    /**
     * Name of the pickup point
     */
    name: string;

    /**
     * City of the pickup point
     */
    city: string;

    /**
     * Address of the pickup point
     */
    address?: string;

    /**
     * Distance to the pickup point in meters
     */
    distance?: number;

    /**
     * Location of the pickup point
     */
    location?: PickupPointLocation;
}
