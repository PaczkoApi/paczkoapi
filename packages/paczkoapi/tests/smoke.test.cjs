const paczkoapi = require('paczkoapi');

// Simple smoke test to verify the package can be required
if (!paczkoapi) throw new Error('Package failed to load');
