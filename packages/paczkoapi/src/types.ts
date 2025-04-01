import { Provider } from '@paczkoapi/common';

export type { Address, PickupPoint, Provider, Location } from '@paczkoapi/common';

/**
 * Konfiguracja cen dostawy dla poszczególnych dostawców.
 */
export type PricesConfig = {
    [key in Provider]?: number;
};
