import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'lib',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'dist-custom-elements',
            customElementsExportBehavior: 'auto-define-custom-elements',
            externalRuntime: false,
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
    devServer: {
        openBrowser: false,
    },
};
