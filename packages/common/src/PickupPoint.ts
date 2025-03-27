import type { Location } from './Location.js';
import type { Provider } from './providers.js';

/**
 * Pickup point
 */
export interface PickupPoint {
    /**
     * Type of the pickup point
     */
    provider: Provider;

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
    location?: Location;
}
