import { createSelector } from './createSelector.lazy.js';
import { initialize } from './initialize.lazy.js';

if (typeof window !== 'undefined') {
    window.paczkoapi = {
        createSelector,
        initialize,
    };
}

export { createSelector, initialize };

export type * from './types.js';
export type { Selector, SelectorOptions } from './createSelector.js';
