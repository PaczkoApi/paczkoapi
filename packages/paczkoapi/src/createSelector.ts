import type { Address, PickupPoint, Provider } from '@paczkoapi/common';

import { initialize } from './initialize.js';

/**
 * Opcje konfiguracji selektora.
 */
export interface SelectorOptions {
    /**
     * Dostępni dostawcy do punktów odbioru.
     *
     * Dostępne opcje:
     * - `inpost`
     * - `dhl`
     *
     * Domyślnie włączeni są wszyscy dostawcy.
     */
    providers?: Provider | Provider[];

    /**
     * Maksymalna liczba wyświetlanych punktów odbioru.
     * @default 5
     */
    limit?: number;

    /**
     * Cena dostawy dla poszczególnych dostawców w złotych.
     * Domyślnie cena dostawy jest niewidoczna.
     */
    prices?: Partial<Record<Provider, number>>;

    /**
     * Obsługa zdarzenia wybrania punktu odbioru.
     */
    onPointSelected?: (point: PickupPoint) => void;
}

/**
 * Selektor punktów odbioru.
 */
export interface Selector {
    /**
     * Zwraca wybrany punkt odbioru.
     */
    get selectedPoint(): PickupPoint | null;

    /**
     * Ustawia adres użytkownika.
     */
    setAddress(address: Address): Promise<void>;

    /**
     * Niszczy komponent selektora.
     */
    destroy(): void;
}

/**
 * Inicjuje selektor punktów odbioru na wybranym elemencie.
 * @param el - Element HTML lub jego selektor CSS.
 * @param options - Opcje konfiguracji selektora.
 */
export function createSelector(el: HTMLElement | string, options: SelectorOptions = {}): Selector {
    initialize();
    const element = typeof el === 'string' ? document.querySelector(el) : el;
    if (!element) {
        throw new Error(`Element nie został znaleziony`);
    }

    const selector = document.createElement('paczkoapi-selector');

    // Rewrite attributes from the element to the selector
    for (const provider of element.getAttributeNames()) {
        const value = element.getAttribute(provider);
        if (value != null) {
            selector.setAttribute(provider, value);
        }
    }

    if (options.providers) {
        selector.providers = options.providers;
    }

    if (options.limit) {
        selector.limit = options.limit;
    }

    if (options.prices) {
        selector.prices = options.prices;
    }

    selector.addEventListener('selected', e => {
        options.onPointSelected?.(e.detail);
    });

    element.after(selector);
    element.remove();

    return {
        get selectedPoint() {
            return selector.point;
        },
        setAddress(address) {
            return selector.setAddress(address);
        },
        destroy() {
            selector.after(element);
            selector.remove();

            // Remove all pending modals
            document.querySelectorAll('paczkoapi-modal').forEach(modal => modal.remove());
        },
    };
}
