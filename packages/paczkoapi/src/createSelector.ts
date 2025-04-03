import type { Address, PickupPoint, PricesConfig, Provider } from './types.js';

import './initialize.js';

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
     * Domyślnie włączony jest tylko dostawca `inpost`.
     *
     * @default 'inpost'
     *
     * @example
     * ```js
     * createSelector('#selector', {
     *     providers: ['inpost', 'dhl'],
     * });
     * ```
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
     *
     * @example
     * ```js
     * createSelector('#selector', {
     *     prices: {
     *         inpost: 10,
     *         dhl: 15,
     *     },
     * });
     * ```
     */
    prices?: PricesConfig;

    /**
     * Czy wyświetlać radio przy punktach odbioru.
     *
     * Wyłączenie radio wymaga zmiany kilku zmiennych CSS,
     * żeby wybrany punkt odbioru był widoczny.
     *
     * Zobacz przykład: [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/PaczkoApi/paczkoapi/tree/main/examples/theme-no-radio?file=index.html)
     *
     * @default true
     */
    showRadio?: boolean;

    /**
     * W przypadku gdy adres użytkownika zmieniany jest często,
     * requesty do API są wysyłane maksymalnie raz na sekundę,
     * aby ograniczyć liczbę zapytań.
     *
     * Można zmienić tą wartość, jeśli jest to konieczne,
     * natomiast może to spowodować, zbyt częste wysyłanie zapytań,
     * a w efekcie wiązać się z większymi kosztami.
     *
     * @default 1000
     */
    debounce?: number;

    /**
     * Obsługa zdarzenia wybrania punktu odbioru.
     *
     * @example
     * ```js
     * createSelector('#selector', {
     *     onPointSelected: (point) => {
     *         console.log(point);
     *     },
     * });
     * ```
     */
    onPointSelected?: (point: PickupPoint) => void;
}

/**
 * Selektor punktów odbioru.
 */
export interface Selector {
    /**
     * Wybrany punkt odbioru.
     */
    readonly selectedPoint: PickupPoint | null;

    /**
     * Aktualny adres użytkownika.
     */
    readonly address: Address | null;

    /**
     * Ustawia adres użytkownika.
     *
     * @param address - Adres użytkownika.
     * @example
     * ```js
     * await selector.setAddress({
     *     city: 'Warszawa',
     *     street: 'ul. Wspólna 67',
     *     postalCode: '00-687',
     * });
     * ```
     */
    setAddress(address: Address): Promise<void>;

    /**
     * Ustawia miasto użytkownika.
     *
     * @param city - Miasto użytkownika.
     */
    setCity(city: string): Promise<void>;

    /**
     * Ustawia kod pocztowy użytkownika.
     *
     * @param postalCode - Kod pocztowy użytkownika.
     */
    setPostalCode(postalCode: string): Promise<void>;

    /**
     * Ustawia ulicę użytkownika.
     *
     * @param street - Ulica użytkownika.
     */
    setStreet(street: string): Promise<void>;

    /**
     * Niszczy komponent selektora.
     */
    destroy(): Promise<void>;
}

/**
 * Inicjuje selektor punktów odbioru na wybranym elemencie.
 * @param el - Element HTML lub jego selektor CSS.
 * @param options - Opcje konfiguracji selektora.
 */
export function createSelector(el: HTMLElement | string, options: SelectorOptions = {}): Selector {
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

    if (options.debounce) {
        selector.debounce = options.debounce;
    }

    selector.showRadio = options.showRadio;
    selector.addEventListener('selected', e => {
        options.onPointSelected?.(e.detail);
    });

    element.after(selector);
    element.remove();

    return {
        get selectedPoint() {
            return selector.point;
        },
        get address() {
            return selector.address;
        },
        setAddress(address) {
            return selector.setAddress(address);
        },
        setCity(city) {
            return selector.setAddress({ ...selector.address, city });
        },
        setPostalCode(postalCode) {
            return selector.setAddress({ ...selector.address, postalCode });
        },
        setStreet(street) {
            return selector.setAddress({ ...selector.address, street });
        },
        destroy() {
            selector.after(element);
            selector.remove();

            // Remove all pending modals
            document.querySelectorAll('paczkoapi-modal').forEach(modal => modal.remove());

            return Promise.resolve();
        },
    };
}
