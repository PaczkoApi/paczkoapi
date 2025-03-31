import type { SelectorOptions } from './createSelector.js';

/**
 * Initializes the selector.
 */
export async function createSelector(el: HTMLElement | string, options: SelectorOptions = {}) {
    const { createSelector: create } = await import('./createSelector.js');
    return create(el, options);
}
