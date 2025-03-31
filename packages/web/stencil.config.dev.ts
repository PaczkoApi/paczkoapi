import type { Config } from '@stencil/core';

import { config as configProd } from './stencil.config';

export const config: Config = {
    ...configProd,
    rollupConfig: {
        inputOptions: {
            external(source) {
                if (/^node:/.test(source) || /^[\w_-]+$/.test(source)) {
                    // Node built-in modules and third party modules
                    return true;
                }

                if (/@paczkoapi\/\w+/.test(source)) {
                    return true;
                }

                if (/@nzyme\/\w+/.test(source)) {
                    return true;
                }

                if (/node_modules/.test(source)) {
                    return false;
                }

                return false;
            },
        },
    },
};
