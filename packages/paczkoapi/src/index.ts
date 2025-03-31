import { selector } from './selector.js';

const paczkoapi = {
    selector,
};

declare global {
    interface Window {
        paczkoapi: typeof paczkoapi;
    }
}

if (typeof window !== 'undefined') {
    window.paczkoapi = paczkoapi;
}

export { selector };
