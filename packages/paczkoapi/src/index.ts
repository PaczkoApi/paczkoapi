import './initialize.js';

import { createSelector } from './createSelector.js';

if (typeof window !== 'undefined') {
    window.paczkoapi = {
        createSelector,
        initialize,
    };
}

export { createSelector };
export type * from './types.js';
export type { Selector, SelectorOptions } from './createSelector.js';

/**
 * Pobiera i inicjuje skrypty.
 * Przydatne, jeśli chcemy załadować skrypty jeszcze przed zainicjowaniem komponentu.
 */
export function initialize() {
    return Promise.resolve();
}
