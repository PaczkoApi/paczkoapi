import type { PickupPoint, Provider } from '@paczkoapi/common';
import { API_URL_POINTS, ApiError, getApiUrl, parseProviders } from '@paczkoapi/common';

import { fetchApi } from './fetchApi.js';

/**
 * Parametry wejściowe dla wyszukiwania najbliższych punktów
 */
export interface FindNearestPointsInput {
    /**
     * Dostawcy punktów odbioru.
     * Możesz podać pojedynczego dostawcę lub tablicę dostawców.
     *
     * @default "inpost"
     * @example "inpost"
     * @example ["inpost", "dpd"]
     */
    providers?: Provider | Provider[];

    /**
     * Nazwa miasta
     * @example "Warszawa"
     */
    city: string;

    /**
     * Kod pocztowy
     * @example "00-000"
     */
    postalCode?: string;

    /**
     * Adres zawierający nazwę ulicy i numer.
     * @example "ul. Jana Pawła II 1"
     */
    street: string;

    /**
     * Limit liczby zwracanych punktów.
     * @example 10
     * @default 5
     */
    limit?: number | null;

    /**
     * Sygnał przerwania
     */
    signal?: AbortSignal;
}

/**
 * Wynik wyszukiwania najbliższych punktów
 */
export interface FindNearestPointsResult {
    /**
     * Punkty odbioru
     */
    points: PickupPoint[];
}

/**
 * Znajdź najbliższe punkty dla podanego adresu.
 */
export async function findNearestPoints(input: FindNearestPointsInput) {
    const url = new URL(API_URL_POINTS, getApiUrl());

    if (input.providers) {
        const providers = parseProviders(input.providers);
        if (providers.length) {
            url.searchParams.set('providers', providers.join(','));
        }
    }

    if (!input.city) {
        throw new ApiError('City is required', 400, ['City is required']);
    }

    if (!input.street) {
        throw new ApiError('Address is required', 400, ['Address is required']);
    }

    url.searchParams.set('city', input.city.toLowerCase());
    url.searchParams.set('street', input.street.toLowerCase());

    if (input.postalCode) {
        url.searchParams.set('postalCode', input.postalCode.toLowerCase());
    }

    if (input.limit) {
        url.searchParams.set('limit', input.limit.toString());
    }

    const result = await fetchApi<FindNearestPointsResult>(url.toString(), {
        signal: input.signal,
    });

    return result;
}
