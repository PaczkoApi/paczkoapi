import { Component, Prop, State, Event, type EventEmitter, Watch, h, VNode } from '@stencil/core';
import { findNearestPoints, PickupPoint, Provider } from '@paczkoapi/client';
import { parseProviders, PROVIDERS } from '@paczkoapi/common';
import { formatLength } from '@nzyme/utils';
import { formatMoney } from '@nzyme/money';

import InpostLogo from '../../assets/inpost.svg';
import DhlLogo from '../../assets/dhl.svg';
import { openInpostMap } from 'src/utils/openInpostMap';

@Component({
    tag: 'paczkoapi-selector',
    styleUrl: './selector.scss',
    shadow: true,
})
export class PaczkoapiSelector {
    /**
     * The providers to search for pickup points
     */
    @Prop()
    get providers(): Provider[] | Provider {
        return this._providers;
    }

    set providers(value: Provider[] | Provider) {
        this._providers = parseProviders(value) as Provider[];
    }

    /**
     * The city to search for pickup points
     */
    @Prop()
    addressCity: string | null = null;

    /**
     * The postal code to search for pickup points
     */
    @Prop()
    addressPostalCode: string | null = null;

    /**
     * The street to search for pickup points
     */
    @Prop()
    addressStreet: string | null = null;

    /**
     * The price of InPost pickup points
     */
    @Prop()
    priceInpost: number | null = null;

    /**
     * The price of DHL pickup points
     */
    @Prop()
    priceDhl: number | null = null;

    /**
     * The limit of pickup points to fetch
     */
    @Prop()
    limit: number = 5;

    /**
     * The theme of the selector
     */
    @Prop()
    theme: 'border' | 'default' = 'default';

    /**
     * The currently selected pickup point ID
     */
    @Prop({ mutable: true })
    selectedPoint: string | null = null;

    /**
     * The currently selected pickup point type
     */
    @Prop({ mutable: true })
    selectedProvider: Provider | null = null;

    /**
     * The currently selected pickup point
     */
    @Prop()
    get point(): PickupPoint | null {
        return this._point;
    }

    /**
     * Event emitted when a pickup point is selected
     */
    @Event()
    selected!: EventEmitter<PickupPoint>;

    @State() nearestPoints: PickupPoint[] = [];
    @State() mapPoints: Partial<Record<Provider, PickupPoint | undefined>> = {};
    @State() isLoading = false;
    @State() error: string | null = null;

    private abortController: AbortController | null = null;
    private _providers: Provider[] = [];
    private _point: PickupPoint | null = null;

    private get providersAvailable(): readonly Provider[] {
        if (!this._providers.length) {
            return PROVIDERS;
        }

        return this._providers;
    }

    @Watch('addressCity')
    @Watch('addressPostalCode')
    @Watch('addressStreet')
    @Watch('limit')
    @Watch('providers')
    async onSearchParamsChange() {
        await this.fetchPickupPoints();
    }

    componentWillLoad() {
        this.fetchPickupPoints();
    }

    disconnectedCallback() {
        this.cancelFetch();
    }

    private async fetchPickupPoints() {
        // Cancel any in-flight requests
        this.cancelFetch();

        // Don't fetch if we don't have enough data
        if (!this.addressCity || !this.addressPostalCode || !this.addressStreet) {
            this.nearestPoints = [];
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.abortController = new AbortController();

        try {
            const points = await findNearestPoints({
                city: this.addressCity,
                postalCode: this.addressPostalCode,
                street: this.addressStreet,
                type: this._providers,
                signal: this.abortController.signal,
                limit: this.limit,
            });

            this.abortController = null;
            this.nearestPoints = points;
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                this.error = err.message;
                this.nearestPoints = [];
            }

            throw err;
        } finally {
            this.abortController = null;
            this.isLoading = false;
        }
    }

    private cancelFetch() {
        if (this.abortController) {
            this.abortController.abort('Canceled by user');
            this.abortController = null;
        }
    }

    private isSelected(point: PickupPoint) {
        return this.selectedProvider === point.type && this.selectedPoint === point.id;
    }

    render() {
        return (
            <fieldset
                role="radiogroup"
                class={`theme_${this.theme}`}
            >
                {/* Najbliższe punkty */}
                {this.nearestPoints.map(point => this.renderPoint(point))}

                {/* Wybór punktu z mapy */}
                {this.providersAvailable.map(provider => this.renderMap(provider))}
            </fieldset>
        );
    }

    private renderPoint(point: PickupPoint, children?: VNode[]) {
        const index = `${point.type}-${point.id.toLowerCase()}`;

        return (
            <label class={this.isSelected(point) ? 'selected' : ''}>
                <input
                    type="radio"
                    name="pickup-point"
                    value={`${point.type}:${point.id}`}
                    class="input"
                    checked={this.isSelected(point)}
                    onChange={() => this.handlePointSelection(point)}
                    aria-labelledby={`point-name-${index}`}
                    aria-describedby={`point-address-${index}`}
                />
                <span
                    class="radio"
                    aria-hidden="true"
                />
                <div class="content">
                    <div class="info">
                        <div
                            id={`point-name-${index}`}
                            class="name"
                        >
                            {this.getPointName(point)}
                        </div>
                        <div
                            id={`point-address-${index}`}
                            class="address"
                        >
                            {this.getPointAddress(point)}
                        </div>
                        {point.distance && (
                            <div class="address">{formatLength(point.distance)} od Ciebie</div>
                        )}
                        {children}
                    </div>
                    {this.renderRight(point.type)}
                </div>
            </label>
        );
    }

    private renderMap(provider: Provider) {
        const point = this.mapPoints[provider];
        if (point) {
            const change = (
                <button
                    class="change"
                    onClick={() => this.handleMapSelection(provider)}
                >
                    Zmień
                </button>
            );
            return this.renderPoint(point, change);
        }

        return (
            <label
                onClick={() => this.handleMapSelection(provider)}
                role="button"
            >
                <span
                    class="radio"
                    aria-hidden="true"
                />
                <div class="content">
                    <div class="info">
                        <div
                            id={`provider-name-${provider}`}
                            class="name"
                        >
                            {this._providers.length === 1
                                ? 'Wybierz z mapy'
                                : this.getProviderName(provider)}
                        </div>
                        {this._providers.length !== 1 && <div class="address">Wybierz z mapy</div>}
                    </div>
                    {this.renderRight(provider)}
                </div>
            </label>
        );
    }

    private renderRight(provider: Provider) {
        const price = this.getPointPrice(provider);
        const logo = this.getPointLogo(provider);

        return (
            <div class="price-provider">
                {price && <span class="price">{formatMoney([price, 'PLN'])}</span>}

                {logo && (
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        class={price ? 'provider' : 'provider provider_large'}
                    />
                )}
            </div>
        );
    }

    private handlePointSelection(point: PickupPoint) {
        this.selectedPoint = point.id;
        this.selectedProvider = point.type;
        this._point = point;
        this.selected.emit(point);
    }

    private async handleMapSelection(provider: Provider) {
        const point = await this.openMap(provider);

        if (point) {
            this.handlePointSelection(point);
            const existing = this.nearestPoints.find(
                p => p.id === point.id && p.type === point.type,
            );
            if (existing) {
                // If the point is already in the nearest points, remove it from the map points
                delete this.mapPoints[provider];
                return;
            }

            this.mapPoints[provider] = point;
        }
    }

    private async openMap(provider: Provider) {
        switch (provider) {
            case 'inpost':
                return await openInpostMap();
            case 'dhl':
                break;
        }
    }

    private getPointName(point: PickupPoint) {
        if (this.providers.length === 1) {
            switch (point.type) {
                case 'inpost':
                    return `${point.address}`;
                case 'dhl':
                    return `${point.name}, ${point.address}`;
                default:
                    return point.name;
            }
        }

        return this.getProviderName(point.type) || point.name;
    }

    private getProviderName(provider: Provider) {
        switch (provider) {
            case 'inpost':
                return `Paczkomat InPost`;
            case 'dhl':
                return `Punkt DHL POP`;
        }
    }

    private getPointAddress(point: PickupPoint) {
        if (this.providers.length === 1) {
            switch (point.type) {
                case 'inpost':
                    return `${point.name}, ${point.city}`;
                case 'dhl':
                    return `${point.city}`;
            }
        }

        return `${point.name}, ${point.address}, ${point.city}`;
    }

    private getPointPrice(provider: Provider) {
        switch (provider) {
            case 'inpost':
                return this.priceInpost;
            case 'dhl':
                return this.priceDhl;
            default:
                return null;
        }
    }

    private getPointLogo(provider: Provider) {
        if (this.providers.length === 1) {
            return;
        }

        switch (provider) {
            case 'inpost':
                return {
                    src: InpostLogo,
                    alt: 'Logo InPost',
                };
            case 'dhl':
                return {
                    src: DhlLogo,
                    alt: 'Logo DHL',
                };
        }
    }
}
