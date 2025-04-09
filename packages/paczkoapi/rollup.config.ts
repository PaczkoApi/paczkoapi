import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import sourcemaps from 'rollup-plugin-sourcemaps';

const isProduction = process.env.ENV === 'prod';

const options: RollupOptions = {
    ...commonConfig(),
    input: ['src/index.ts', 'src/index.lazy.ts'],
    output: [
        // ESM bundle
        {
            dir: 'dist',
            entryFileNames: '[name].mjs',
            format: 'es',
            chunkFileNames: 'chunks/[hash].mjs',
            sourcemap: true,
        },
        // CJS bundle
        {
            dir: 'dist',
            entryFileNames: '[name].cjs',
            format: 'cjs',
            chunkFileNames: 'chunks/[hash].cjs',
            sourcemap: true,
        },
    ],
};

const optionsIife: RollupOptions = {
    ...commonConfig(),
    input: 'src/index.ts',
    output: [
        // IIFE bundle
        {
            file: 'dist/index.js',
            format: 'iife',
            inlineDynamicImports: true,
            sourcemap: true,
        },
    ],
};

export default [options, optionsIife];

function commonConfig(): RollupOptions {
    return {
        cache: !isProduction,
        watch: {
            clearScreen: false,
        },
        plugins: [
            typescript(),
            commonjs(),
            isProduction && terser(),
            sourcemaps({}),
            nodeResolve({
                preferBuiltins: true,
                extensions: ['.js', '.mjs', '.ts', '.tsx', '.json'],
            }),
        ],
        external: id => {
            if (isProduction) {
                return false;
            }

            if (/^node:/.test(id) || /^[\w_-]+$/.test(id)) {
                // Node built-in modules and third party modules
                return true;
            }

            if (/node_modules/.test(id)) {
                return true;
            }

            return id.startsWith('@paczkoapi/');
        },
    };
}
