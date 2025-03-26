import type { Item } from '@nzyme/types';

import { ApiError } from './ApiError.js';

/**
 * Pickup point types
 */
export const PROVIDERS = new Set(['inpost', 'dhl'] as const);

/**
 * Provider type
 */
export type Provider = Item<typeof PROVIDERS> & string;

/**
 * Parse providers
 */
export function parseProviders(providers: string | Provider[] | null | undefined): Provider[] {
    if (!providers) {
        return [];
    }

    if (typeof providers === 'string') {
        providers = providers.split(',').map(provider => provider.trim().toLowerCase() as Provider);
    }

    for (const provider of providers) {
        if (!PROVIDERS.has(provider)) {
            throw new ApiError(`Invalid provider: ${provider}`);
        }
    }

    return providers;
}
