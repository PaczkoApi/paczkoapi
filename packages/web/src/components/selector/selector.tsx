import { Component, Prop, State, Event, type EventEmitter, Watch, h } from '@stencil/core';
import { findNearestPoints, PickupPoint, Provider } from '@paczkoapi/client';
import { parseProviders } from '@paczkoapi/config';
import { formatLength } from '@nzyme/utils';
import { formatMoney } from '@nzyme/money';

import InpostLogo from '../../assets/inpost.svg';
import DhlLogo from '../../assets/dhl.svg';

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
        return this.providersArr;
    }

    set providers(value: Provider[] | Provider) {
        this.providersArr = parseProviders(value);
    }

    /**
     * The city to search for pickup points
     */
    @Prop() addressCity: string;

    /**
     * The postal code to search for pickup points
     */
    @Prop() addressPostalCode: string;

    /**
     * The street to search for pickup points
     */
    @Prop() addressStreet: string;

    /**
     * The price of InPost pickup points
     */
    @Prop() priceInpost: number;

    /**
     * The price of DHL pickup points
     */
    @Prop() priceDhl: number;

    /**
     * The limit of pickup points to fetch
     */
    @Prop() limit: number = 5;

    /**
     * The theme of the selector
     */
    @Prop() theme: 'border' | 'default' = 'default';

    /**
     * The currently selected pickup point ID
     */
    @Prop({ mutable: true }) selectedPoint: string | null = null;

    /**
     * The currently selected pickup point type
     */
    @Prop({ mutable: true }) selectedProvider: Provider | null = null;

    /**
     * Event emitted when a pickup point is selected
     */
    @Event() pointSelected: EventEmitter<PickupPoint>;

    @State() pickupPoints: PickupPoint[] = [];
    @State() isLoading = false;
    @State() error: string = null;

    private abortController: AbortController = null;
    private providersArr: Provider[] = [];

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
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    private async fetchPickupPoints() {
        // Cancel any in-flight requests
        if (this.abortController) {
            this.abortController.abort();
        }

        // Don't fetch if we don't have enough data
        if (!this.addressCity && !this.addressPostalCode && !this.addressStreet) {
            this.pickupPoints = [];
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.abortController = new AbortController();

        try {
            this.pickupPoints = await findNearestPoints({
                city: this.addressCity,
                postalCode: this.addressPostalCode,
                street: this.addressStreet,
                type: this.providersArr,
                signal: this.abortController.signal,
                limit: this.limit,
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                this.error = err.message;
                this.pickupPoints = [];
            }
        } finally {
            this.isLoading = false;
        }
    }

    private handleSelection = (point: PickupPoint) => {
        this.selectedPoint = point.id;
        this.selectedProvider = point.type;
        this.pointSelected.emit(point);
    };

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

        switch (point.type) {
            case 'inpost':
                return `Paczkomat InPost`;
            case 'dhl':
                return `Punkt DHL POP`;
            default:
                return point.name;
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

    private getPointPrice(point: PickupPoint) {
        switch (point.type) {
            case 'inpost':
                return this.priceInpost;
            case 'dhl':
                return this.priceDhl;
            default:
                return null;
        }
    }

    private getPointLogo(point: PickupPoint) {
        if (this.providers.length === 1) {
            return;
        }

        switch (point.type) {
            case 'inpost':
                return InpostLogo;
            case 'dhl':
                return DhlLogo;
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
                {this.pickupPoints.map((point, index) => {
                    const price = this.getPointPrice(point);

                    return (
                        <label class={this.isSelected(point) ? 'selected' : ''}>
                            <input
                                type="radio"
                                name="pickup-point"
                                value={`${point.type}:${point.id}`}
                                class="input"
                                checked={this.isSelected(point)}
                                onChange={() => this.handleSelection(point)}
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
                                    <div class="address">
                                        {formatLength(point.distance)} od Ciebie
                                    </div>
                                </div>
                                <div class="price-provider">
                                    {price && (
                                        <span class="price">{formatMoney([price, 'PLN'])}</span>
                                    )}

                                    {this.providers.length !== 1 && (
                                        <img
                                            src={this.getPointLogo(point)}
                                            alt="FedEx logo"
                                            class={price ? 'provider' : 'provider provider_large'}
                                        />
                                    )}
                                </div>
                            </div>
                        </label>
                    );
                })}
            </fieldset>
        );
    }
}
