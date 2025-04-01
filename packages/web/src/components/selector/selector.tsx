import type { PickupPoint, Provider } from '@paczkoapi/client';
import { findNearestPoints } from '@paczkoapi/client';
import type { Address } from '@paczkoapi/common';
import { PROVIDERS, parseProviders } from '@paczkoapi/common';
import {
    Component,
    Event,
    type EventEmitter,
    Method,
    Prop,
    State,
    type VNode,
    Watch,
    h,
} from '@stencil/core';
import debounce from 'lodash.debounce';
import { formatMoney } from 'src/utils/formatMoney';
import { openDhlMap } from 'src/utils/openDhlMap';
import { openInpostMap } from 'src/utils/openInpostMap';

import { formatLength } from '@nzyme/utils';

import DhlLogo from '../../assets/dhl.svg';
import InpostLogo from '../../assets/inpost.svg';

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
    get addressCity(): string | null | undefined {
        return this.address?.city;
    }

    set addressCity(value: string | null | undefined) {
        this.address = {
            ...this.address,
            city: value,
        };
    }

    /**
     * The postal code to search for pickup points
     */
    @Prop()
    get addressPostalCode(): string | null | undefined {
        return this.address?.postalCode;
    }

    set addressPostalCode(value: string | null | undefined) {
        this.address = {
            ...this.address,
            postalCode: value,
        };
    }

    /**
     * The street to search for pickup points
     */
    @Prop()
    get addressStreet(): string | null | undefined {
        return this.address?.street;
    }

    set addressStreet(value: string | null | undefined) {
        this.address = {
            ...this.address,
            street: value,
        };
    }

    /**
     * Whether to show the radios
     */
    @Prop()
    showRadio: boolean | null | undefined;

    /**
     * The address to search for pickup points
     */
    @Prop({ mutable: true })
    address: Address | null | undefined;

    /**
     * The prices of pickup points
     */
    @Prop()
    prices: Partial<Record<Provider, number>> | null | undefined;

    /**
     * The limit of pickup points to fetch
     */
    @Prop()
    limit: number | null | undefined;

    /**
     * The theme of the selector
     */
    @Prop()
    theme: 'border' | null | undefined;

    /**
     * The currently selected pickup point ID
     */
    @Prop({ mutable: true })
    pointName: string | null | undefined;

    /**
     * The currently selected pickup point type
     */
    @Prop({ mutable: true })
    pointProvider: Provider | null | undefined;

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
    @Event({ composed: true })
    selected!: EventEmitter<PickupPoint>;

    @State() nearestPoints: PickupPoint[] | undefined;
    @State() mapPoints: Partial<Record<Provider, PickupPoint | undefined>> | undefined;
    @State() isLoading: boolean | undefined;
    @State() error: string | undefined;

    /**
     * Set the address of the selector
     */
    @Method()
    async setAddress(address: Address, forceFetch = false) {
        this.addressCity = address.city ?? null;
        this.addressPostalCode = address.postalCode ?? null;
        this.addressStreet = address.street ?? null;

        if (forceFetch) {
            void this.fetchDebounced();
            await this.fetchDebounced.flush();
        } else {
            await this.fetchDebounced();
        }
    }

    @Method()
    async selectPoint(provider: Provider, id: string) {
        this.pointName = id;
        this.pointProvider = provider;
        await Promise.resolve();
    }

    private abortController: AbortController | null = null;
    private _providers: Provider[] = [];
    private _point: PickupPoint | null = null;

    private fetchDebounced = debounce(() => this.fetchPickupPoints(), 1000, {
        leading: true,
        trailing: true,
    });

    private get providersAvailable(): readonly Provider[] {
        if (!this._providers.length) {
            return PROVIDERS;
        }

        return this._providers;
    }

    @Watch('address')
    @Watch('limit')
    @Watch('providers')
    onSearchParamsChange() {
        void this.fetchDebounced();
    }

    componentWillLoad() {
        void this.fetchDebounced();
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
        this.error = undefined;
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
            this.selectFirstPoint();
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

    private selectFirstPoint() {
        const current = this.point;
        if (current) {
            const currentMap = this.mapPoints?.[current.provider];
            if (currentMap?.id === current.id) {
                // Point was selected from map
                return;
            }
        }

        const first = this.nearestPoints?.[0];
        if (first) {
            this.handlePointSelection(first);
        }
    }

    private cancelFetch() {
        if (this.abortController) {
            this.abortController.abort('Canceled by user');
            this.abortController = null;
        }
    }

    private isSelected(point: PickupPoint) {
        return this.pointProvider === point.provider && this.pointName === point.id;
    }

    render() {
        return (
            <fieldset
                role="radiogroup"
                class={`theme_${this.theme}`}
            >
                {this.isLoading !== false && <div class="loader" />}

                {/* Najbliższe punkty */}
                {this.nearestPoints?.map(point => this.renderPoint(point))}

                {/* Wybór punktu z mapy */}
                {this.providersAvailable.map(provider => this.renderMap(provider))}
            </fieldset>
        );
    }

    private renderPoint(point: PickupPoint, children?: VNode[] | VNode) {
        const index = `${point.provider}-${point.id.toLowerCase()}`;

        return (
            <label class={this.isSelected(point) ? 'selected' : ''}>
                <input
                    type="radio"
                    name="pickup-point"
                    value={`${point.provider}:${point.id}`}
                    class="input"
                    checked={this.isSelected(point)}
                    onChange={() => this.handlePointSelection(point)}
                    aria-labelledby={`point-name-${index}`}
                    aria-describedby={`point-address-${index}`}
                />
                {this.renderRadio()}
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
                    {this.renderRight(point.provider)}
                </div>
            </label>
        );
    }

    private renderMap(provider: Provider) {
        const point = this.mapPoints?.[provider];
        if (point) {
            const change = (
                <button
                    class="change"
                    onClick={() => void this.handleMapSelection(provider)}
                >
                    Wybierz inny z&nbsp;mapy
                </button>
            );
            return this.renderPoint(point, change);
        }

        return (
            <label
                onClick={() => void this.handleMapSelection(provider)}
                role="button"
            >
                {this.renderRadio()}
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

    private renderRadio() {
        if (this.showRadio === false) {
            return null;
        }

        return (
            <span
                class="radio"
                aria-hidden="true"
            />
        );
    }

    private renderRight(provider: Provider) {
        const price = this.getPointPrice(provider);
        const logo = this.getPointLogo(provider);

        return (
            <div class="price-provider">
                {price && <span class="price">{formatMoney(price)}</span>}

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
        this.pointName = point.id;
        this.pointProvider = point.provider;
        this._point = point;
        this.selected.emit(point);
    }

    private async handleMapSelection(provider: Provider) {
        const point = await this.openMap(provider);

        if (point) {
            this.handlePointSelection(point);
            const existing = this.nearestPoints?.find(
                p => p.id === point.id && p.provider === point.provider,
            );
            if (!this.mapPoints) {
                this.mapPoints = {};
            }

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
                return await openDhlMap();
        }
    }

    private getPointName(point: PickupPoint) {
        if (this.providers.length === 1) {
            switch (point.provider) {
                case 'inpost':
                    return `${point.address}`;
                case 'dhl':
                    return `${point.name}, ${point.address}`;
                default:
                    return point.name;
            }
        }

        return this.getProviderName(point.provider) || point.name;
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
            switch (point.provider) {
                case 'inpost':
                    return `${point.name}, ${point.city}`;
                case 'dhl':
                    return `${point.city}`;
            }
        }

        return `${point.name}, ${point.address}, ${point.city}`;
    }

    private getPointPrice(provider: Provider) {
        return this.prices?.[provider] ?? null;
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
