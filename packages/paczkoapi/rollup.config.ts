import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { Plugin, RollupOptions } from 'rollup';
import sourcemaps from 'rollup-plugin-sourcemaps';

const isProduction = process.env.ENV === 'prod';

const options: RollupOptions = {
    input: ['src/index.ts', 'src/index.lazy.ts'],
    plugins: plugins(),
    cache: !isProduction,
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
    input: 'src/index.ts',
    plugins: plugins(),
    cache: !isProduction,
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

function plugins() {
    return [
        typescript(),
        commonjs(),
        terser(),
        sourcemaps({}),
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.js', '.mjs', '.ts', '.tsx', '.json'],
        }),
    ].filter(Boolean) as Plugin[];
}
