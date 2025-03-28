/**
 * Normalizes an address by removing extra spaces and converting to lowercase.
 */
export function normalizeAddress(address: string) {
    return address.trim().replace(/\s+/g, ' ').toLowerCase();
}
