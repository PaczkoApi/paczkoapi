import { createSelector } from './createSelector.lazy.js';
import { initialize } from './initialize.lazy.js';

if (typeof window !== 'undefined') {
    window.paczkoapi = {
        createSelector,
        initialize,
    };
}

export { createSelector, initialize };

export type { Address, PickupPoint, Provider } from '@paczkoapi/common';
export type { Selector } from './createSelector.js';
