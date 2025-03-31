import { createSelector } from './createSelector.js';

window.paczkoapi = {
    createSelector,
    initialize,
};

export { createSelector };
export type { Address, PickupPoint, Provider } from '@paczkoapi/common';
export type { Selector } from './createSelector.js';

/**
 * Initialize the Paczko API.
 */
export function initialize() {
    return Promise.resolve();
}
