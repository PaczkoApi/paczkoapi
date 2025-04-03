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

declare module 'react' {
    import type { Address, PickupPoint, Provider } from 'paczkoapi';
    namespace JSX {
        interface IntrinsicElements {
            'paczkoapi-selector': {
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
                 */
                providers?: Provider | Provider[];

                /**
                 * Adres użytkownika.
                 */
                address?: Address | null;

                /**
                 * Miasto użytkownika.
                 */
                addressCity?: string | null;

                /**
                 * Kod pocztowy użytkownika.
                 */
                addressPostalCode?: string | null;

                /**
                 * Ulica użytkownika.
                 */
                addressStreet?: string | null;

                /**
                 * Cena dostawy dla poszczególnych dostawców w złotych.
                 */
                prices?: Partial<Record<Provider, number>> | null;

                /**
                 * Maksymalna liczba wyświetlanych punktów odbioru.
                 * @default 5
                 */
                limit?: number | null;

                /**
                 * Czy wyświetlać radio przy punktach odbioru.
                 *
                 * Wyłączenie radio wymaga zmiany kilku zmiennych CSS,
                 * żeby wybrany punkt odbioru był widoczny.
                 *
                 * @default true
                 */
                showRadio?: boolean | null;

                /**
                 * W przypadku gdy adres użytkownika zmieniany jest często,
                 * requesty do API są wysyłane maksymalnie raz na sekundę,
                 * aby ograniczyć liczbę zapytań.
                 *
                 * @default 1000
                 */
                debounce?: number | null;

                /**
                 * Zdarzenie wybrania punktu odbioru.
                 */
                onselected: (event: CustomEvent<PickupPoint>) => void;
            };
        }
    }
}
