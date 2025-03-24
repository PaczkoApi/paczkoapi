const paczkoapi = require('@paczkoapi/client');

// Simple smoke test to verify the package can be required
if (!paczkoapi) throw new Error('Package failed to load');
