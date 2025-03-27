import { Component, Event, type EventEmitter, h } from '@stencil/core';

@Component({
    tag: 'paczkoapi-map-inpost',
    shadow: true,
})
export class PaczkoapiMapInpost {
    /**
     * Event emitted when modal is closed
     */
    @Event() close!: EventEmitter<void>;

    render() {
        return (
            <div
                class="overlay"
                role="dialog"
                aria-modal="true"
                aria-labelledby="title"
            >
                <div
                    class="modal"
                    role="document"
                >
                    <header class="header">
                        <h2
                            id="title"
                            class="title"
                        ></h2>
                        <button
                            class="close"
                            aria-label="Zamknij okno"
                            type="button"
                        >
                            &times;
                        </button>
                    </header>
                    <div class="content">
                        <slot />
                    </div>
                </div>
            </div>
        );
    }
}
