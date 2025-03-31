import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import del from 'rollup-plugin-delete';
import sourcemaps from 'rollup-plugin-sourcemaps';

const isProduction = process.env.ENV === 'prod';

const options: RollupOptions = {
    input: 'src/index.ts',
    plugins: [
        commonjs(),
        typescript(),
        isProduction && terser(),
        del({ targets: 'dist' }),
        isProduction && sourcemaps({}),
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.js', '.mjs', '.ts', '.tsx', '.json'],
        }),
    ],
    output: [
        // IIFE bundle
        {
            file: 'dist/index.js',
            format: 'iife',
            inlineDynamicImports: true,
            sourcemap: !isProduction,
        },
        // ESM bundle
        {
            dir: 'dist',
            entryFileNames: 'index.mjs',
            format: 'es',
            chunkFileNames: 'esm/[hash].mjs',
            sourcemap: !isProduction,
        },
        // CJS bundle
        {
            dir: 'dist',
            entryFileNames: 'index.cjs',
            format: 'cjs',
            chunkFileNames: 'cjs/[hash].cjs',
            sourcemap: !isProduction,
        },
    ],
};

export default options;
