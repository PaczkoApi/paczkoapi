import type { Selector, SelectorOptions } from './createSelector.js';

/**
 * Initializes the selector.
 */
export function createSelector(el: HTMLElement | string, options: SelectorOptions = {}): Selector {
    let selector: Selector | undefined;

    const promise = createSelectorLazy(el, options).then(s => {
        selector = s;
        return s;
    });

    return {
        get selectedPoint() {
            return selector?.selectedPoint ?? null;
        },
        get address() {
            return selector?.address ?? null;
        },
        setAddress: address => promise.then(s => s.setAddress(address)),
        setCity: city => promise.then(s => s.setCity(city)),
        setPostalCode: postalCode => promise.then(s => s.setPostalCode(postalCode)),
        setStreet: street => promise.then(s => s.setStreet(street)),
        destroy: () => promise.then(s => s.destroy()),
    };
}

async function createSelectorLazy(
    el: HTMLElement | string,
    options: SelectorOptions = {},
): Promise<Selector> {
    const { createSelector } = await import('./createSelector.js');
    return createSelector(el, options);
}
