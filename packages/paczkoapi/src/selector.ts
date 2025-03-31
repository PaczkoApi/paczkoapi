let isInitialized = false;

/**
 * Initializes the selector.
 */
export async function selector() {
    if (!isInitialized) {
        isInitialized = true;
        await Promise.all([loadSelector(), loadModal()]);
    }
}

async function loadSelector() {
    const { defineCustomElement } = await import('@paczkoapi/web/components/paczkoapi-selector');
    defineCustomElement();
}

async function loadModal() {
    const { defineCustomElement } = await import('@paczkoapi/web/components/paczkoapi-modal');
    defineCustomElement();
}
