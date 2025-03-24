/**
 * Pickup point type
 */
export type PickupPointType = 'inpost' | 'dpd';

/**
 * Pickup point
 */
export interface PickupPoint {
    /**
     * Type of the pickup point
     */
    type: PickupPointType;

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
    address: string | null;

    /**
     * Distance to the pickup point in meters
     */
    distance: number | null;
}
