const paczkoapi = require('paczkoapi');
const paczkoapiLazy = require('paczkoapi/lazy');

// Simple smoke test to verify the package can be required
if (!paczkoapi) throw new Error('Package failed to load');
if (!paczkoapiLazy) throw new Error('Lazy package failed to load');
