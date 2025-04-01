import type { Location } from './Location.js';
import type { Provider } from './providers.js';

/**
 * Punkt odbioru
 */
export interface PickupPoint {
    /**
     * Typ punktu odbioru
     */
    provider: Provider;

    /**
     * ID punktu odbioru
     */
    id: string;

    /**
     * Nazwa punktu odbioru
     */
    name: string;

    /**
     * Miasto punktu odbioru
     */
    city: string;

    /**
     * Adres punktu odbioru
     */
    address?: string;

    /**
     * Odległość do punktu odbioru w metrach
     */
    distance?: number;

    /**
     * Lokalizacja punktu odbioru
     */
    location?: Location;
}
