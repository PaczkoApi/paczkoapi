import type { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'lib',
    outputTargets: [
        {
            type: 'dist',
        },
        {
            type: 'dist-custom-elements',
            externalRuntime: true,
            generateTypeDeclarations: true,
            minify: false,
        },
        {
            type: 'docs-readme',
            footer: '',
        },
    ],
    testing: {
        browserHeadless: 'shell',
    },
    buildDist: true,
    plugins: [sass()],
    sourceMap: true,
};
