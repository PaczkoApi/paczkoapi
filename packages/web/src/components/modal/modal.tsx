import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

import { lockBodyScroll } from '@nzyme/dom-utils';

@Component({
    tag: 'paczkoapi-modal',
    styleUrl: './modal.scss',
    shadow: true,
})
export class PaczkoapiModal {
    /**
     * The title of the map
     */
    @Prop() modalTitle: string | null = null;

    /**
     * Event emitted when modal is closed
     */
    @Event() close!: EventEmitter<void>;

    private lockScroll: (() => void) | null = null;

    componentWillLoad() {
        this.lockScroll = lockBodyScroll();
    }

    disconnectedCallback() {
        this.lockScroll?.();
    }

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
                        >
                            {this.modalTitle}
                        </h2>
                        <button
                            class="close"
                            aria-label="Zamknij okno"
                            type="button"
                            onClick={() => this.close.emit()}
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
