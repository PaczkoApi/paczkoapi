import type { Selector, SelectorOptions } from './createSelector.js';

/**
 * Initializes the selector.
 */
export function createSelector(el: HTMLElement | string, options: SelectorOptions = {}): Selector {
    let selector: Selector | undefined;

    const selectorPromise = createSelectorLazy(el, options).then(s => {
        selector = s;
    });

    return {
        get selectedPoint() {
            return selector?.selectedPoint ?? null;
        },
        async setAddress(address) {
            if (!selector) {
                await selectorPromise;
            }

            await selector?.setAddress(address);
        },
        async destroy() {
            if (!selector) {
                await selectorPromise;
            }

            await selector?.destroy();
        },
    };
}

async function createSelectorLazy(
    el: HTMLElement | string,
    options: SelectorOptions = {},
): Promise<Selector> {
    const { createSelector } = await import('./createSelector.js');
    return createSelector(el, options);
}
