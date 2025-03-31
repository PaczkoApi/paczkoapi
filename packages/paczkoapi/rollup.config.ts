import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import del from 'rollup-plugin-delete';

import { unwrapCjsDefaultImport } from '@nzyme/esm';

const options: RollupOptions = {
    input: 'src/index.ts',
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.js', '.mjs', '.ts', '.tsx', '.json'],
        }),
        unwrapCjsDefaultImport(commonjs)(),
        unwrapCjsDefaultImport(typescript)(),
        unwrapCjsDefaultImport(terser)(),
        del({ targets: 'dist' }),
    ],
    output: [
        // IIFE bundle
        {
            file: 'dist/index.js',
            format: 'iife',
            inlineDynamicImports: true,
        },
        // ESM bundle
        {
            dir: 'dist',
            entryFileNames: 'index.mjs',
            format: 'es',
        },
        // CJS bundle
        {
            dir: 'dist',
            entryFileNames: 'index.cjs',
            format: 'cjs',
        },
    ],
};

export default options;
