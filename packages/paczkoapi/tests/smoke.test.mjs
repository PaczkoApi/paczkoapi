import * as paczkoapi from 'paczkoapi';
import * as paczkoapiLazy from 'paczkoapi/lazy';

// Simple smoke test to verify the package can be imported
if (!paczkoapi) throw new Error('Package failed to load');
if (!paczkoapiLazy) throw new Error('Lazy package failed to load');
