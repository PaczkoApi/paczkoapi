import { Config } from '@stencil/core';

import { config as configProd } from './stencil.config';

export const config: Config = {
    ...configProd,
    outputTargets: [
        {
            type: 'www',
        },
    ],
};
