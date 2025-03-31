import { createSelector } from './createSelector.lazy.js';
import { initialize } from './initialize.lazy.js';

const paczkoapi = {
    createSelector,
    initialize,
};

declare global {
    interface Window {
        paczkoapi: typeof paczkoapi;
    }
}

if (typeof window !== 'undefined') {
    window.paczkoapi = paczkoapi;
}

export { createSelector, initialize };
export type { Address, PickupPoint, Provider } from '@paczkoapi/common';
export type { Selector } from './createSelector.js';
