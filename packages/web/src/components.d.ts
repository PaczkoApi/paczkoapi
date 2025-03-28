/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PickupPoint, Provider } from "@paczkoapi/client";
export { PickupPoint, Provider } from "@paczkoapi/client";
export namespace Components {
    interface PaczkoapiMapInpost {
    }
    interface PaczkoapiModal {
        /**
          * The title of the map
         */
        "modalTitle": string | null;
    }
    interface PaczkoapiSelector {
        /**
          * The city to search for pickup points
         */
        "addressCity": string | null;
        /**
          * The postal code to search for pickup points
         */
        "addressPostalCode": string | null;
        /**
          * The street to search for pickup points
         */
        "addressStreet": string | null;
        /**
          * The limit of pickup points to fetch
         */
        "limit": number;
        /**
          * The currently selected pickup point
          * @readonly
         */
        "point": PickupPoint | null;
        /**
          * The currently selected pickup point ID
         */
        "pointName": string | null;
        /**
          * The currently selected pickup point type
         */
        "pointProvider": Provider | null;
        /**
          * The price of DHL pickup points
         */
        "priceDhl": number | null;
        /**
          * The price of InPost pickup points
         */
        "priceInpost": number | null;
        /**
          * The providers to search for pickup points
         */
        "providers": Provider[] | Provider;
        "selectPoint": (provider: Provider, id: string) => Promise<void>;
        /**
          * Set the address of the selector
         */
        "setAddress": (address: { city?: string; postalCode?: string; street?: string; }) => Promise<void>;
        /**
          * The theme of the selector
         */
        "theme": 'border' | 'default';
    }
}
export interface PaczkoapiMapInpostCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPaczkoapiMapInpostElement;
}
export interface PaczkoapiModalCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPaczkoapiModalElement;
}
export interface PaczkoapiSelectorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPaczkoapiSelectorElement;
}
declare global {
    interface HTMLPaczkoapiMapInpostElementEventMap {
        "close": void;
    }
    interface HTMLPaczkoapiMapInpostElement extends Components.PaczkoapiMapInpost, HTMLStencilElement {
        addEventListener<K extends keyof HTMLPaczkoapiMapInpostElementEventMap>(type: K, listener: (this: HTMLPaczkoapiMapInpostElement, ev: PaczkoapiMapInpostCustomEvent<HTMLPaczkoapiMapInpostElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLPaczkoapiMapInpostElementEventMap>(type: K, listener: (this: HTMLPaczkoapiMapInpostElement, ev: PaczkoapiMapInpostCustomEvent<HTMLPaczkoapiMapInpostElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLPaczkoapiMapInpostElement: {
        prototype: HTMLPaczkoapiMapInpostElement;
        new (): HTMLPaczkoapiMapInpostElement;
    };
    interface HTMLPaczkoapiModalElementEventMap {
        "close": void;
    }
    interface HTMLPaczkoapiModalElement extends Components.PaczkoapiModal, HTMLStencilElement {
        addEventListener<K extends keyof HTMLPaczkoapiModalElementEventMap>(type: K, listener: (this: HTMLPaczkoapiModalElement, ev: PaczkoapiModalCustomEvent<HTMLPaczkoapiModalElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLPaczkoapiModalElementEventMap>(type: K, listener: (this: HTMLPaczkoapiModalElement, ev: PaczkoapiModalCustomEvent<HTMLPaczkoapiModalElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLPaczkoapiModalElement: {
        prototype: HTMLPaczkoapiModalElement;
        new (): HTMLPaczkoapiModalElement;
    };
    interface HTMLPaczkoapiSelectorElementEventMap {
        "pointSelected": PickupPoint;
    }
    interface HTMLPaczkoapiSelectorElement extends Components.PaczkoapiSelector, HTMLStencilElement {
        addEventListener<K extends keyof HTMLPaczkoapiSelectorElementEventMap>(type: K, listener: (this: HTMLPaczkoapiSelectorElement, ev: PaczkoapiSelectorCustomEvent<HTMLPaczkoapiSelectorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLPaczkoapiSelectorElementEventMap>(type: K, listener: (this: HTMLPaczkoapiSelectorElement, ev: PaczkoapiSelectorCustomEvent<HTMLPaczkoapiSelectorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLPaczkoapiSelectorElement: {
        prototype: HTMLPaczkoapiSelectorElement;
        new (): HTMLPaczkoapiSelectorElement;
    };
    interface HTMLElementTagNameMap {
        "paczkoapi-map-inpost": HTMLPaczkoapiMapInpostElement;
        "paczkoapi-modal": HTMLPaczkoapiModalElement;
        "paczkoapi-selector": HTMLPaczkoapiSelectorElement;
    }
}
declare namespace LocalJSX {
    interface PaczkoapiMapInpost {
        /**
          * Event emitted when modal is closed
         */
        "onClose"?: (event: PaczkoapiMapInpostCustomEvent<void>) => void;
    }
    interface PaczkoapiModal {
        /**
          * The title of the map
         */
        "modalTitle"?: string | null;
        /**
          * Event emitted when modal is closed
         */
        "onClose"?: (event: PaczkoapiModalCustomEvent<void>) => void;
    }
    interface PaczkoapiSelector {
        /**
          * The city to search for pickup points
         */
        "addressCity"?: string | null;
        /**
          * The postal code to search for pickup points
         */
        "addressPostalCode"?: string | null;
        /**
          * The street to search for pickup points
         */
        "addressStreet"?: string | null;
        /**
          * The limit of pickup points to fetch
         */
        "limit"?: number;
        /**
          * Event emitted when a pickup point is selected
         */
        "onPointSelected"?: (event: PaczkoapiSelectorCustomEvent<PickupPoint>) => void;
        /**
          * The currently selected pickup point
          * @readonly
         */
        "point"?: PickupPoint | null;
        /**
          * The currently selected pickup point ID
         */
        "pointName"?: string | null;
        /**
          * The currently selected pickup point type
         */
        "pointProvider"?: Provider | null;
        /**
          * The price of DHL pickup points
         */
        "priceDhl"?: number | null;
        /**
          * The price of InPost pickup points
         */
        "priceInpost"?: number | null;
        /**
          * The providers to search for pickup points
         */
        "providers"?: Provider[] | Provider;
        /**
          * The theme of the selector
         */
        "theme"?: 'border' | 'default';
    }
    interface IntrinsicElements {
        "paczkoapi-map-inpost": PaczkoapiMapInpost;
        "paczkoapi-modal": PaczkoapiModal;
        "paczkoapi-selector": PaczkoapiSelector;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "paczkoapi-map-inpost": LocalJSX.PaczkoapiMapInpost & JSXBase.HTMLAttributes<HTMLPaczkoapiMapInpostElement>;
            "paczkoapi-modal": LocalJSX.PaczkoapiModal & JSXBase.HTMLAttributes<HTMLPaczkoapiModalElement>;
            "paczkoapi-selector": LocalJSX.PaczkoapiSelector & JSXBase.HTMLAttributes<HTMLPaczkoapiSelectorElement>;
        }
    }
}
