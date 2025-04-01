import { ApiError } from './ApiError.js';

/**
 * Pickup point types
 */
export const PROVIDERS: readonly Provider[] = ['inpost', 'dhl'];

/**
 * Provider set
 */
export const PROVIDERS_SET = new Set(PROVIDERS);

/**
 * Typ dostawcy
 */
export type Provider = 'inpost' | 'dhl';

/**
 * Parse providers
 */
export function parseProviders(
    providers: string | string[] | null | undefined,
    errors?: string[],
): readonly Provider[] {
    if (!providers) {
        return PROVIDERS;
    }

    let throwOnError = false;
    if (!errors) {
        errors = [];
        throwOnError = true;
    }

    if (typeof providers === 'string') {
        providers = providers.split(',').map(provider => provider.trim().toLowerCase());
    }

    if (providers.length === 0) {
        return PROVIDERS;
    }

    for (const provider of providers) {
        if (!PROVIDERS_SET.has(provider as Provider)) {
            errors?.push(`Invalid provider: ${provider}`);
        }
    }

    if (throwOnError && errors?.length) {
        throw new ApiError(`Invalid provider`, 400, errors);
    }

    return providers as Provider[];
}
