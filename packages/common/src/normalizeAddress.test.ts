import { expect, test } from 'vitest';

import { normalizeAddress } from './normalizeAddress.js';

test('normalize address', () => {
    expect(normalizeAddress('')).toBe('');
});
