import { defineCustomElement as defineModal } from '@paczkoapi/web/components/paczkoapi-modal';
import { defineCustomElement as defineSelector } from '@paczkoapi/web/components/paczkoapi-selector';

let isInitialized = false;

/**
 * Inicjuje web komponenty.
 */
export function initialize() {
    if (isInitialized) {
        return;
    }

    defineSelector();
    defineModal();
    isInitialized = true;
}
