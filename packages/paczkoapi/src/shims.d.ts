import type { createSelector } from './createSelector.lazy.js';
import type { initialize } from './initialize.lazy.js';

declare global {
    interface Window {
        paczkoapi: {
            createSelector: typeof createSelector;
            initialize: typeof initialize;
        };
    }
}
