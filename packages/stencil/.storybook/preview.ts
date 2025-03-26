import { setApiLocal } from '@paczkoapi/config';
import type { Preview } from '@storybook/web-components';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { defineCustomElements } from '../loader';

defineCustomElements();
setApiLocal();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        viewport: {
            viewports: {
                ...INITIAL_VIEWPORTS,
                ...MINIMAL_VIEWPORTS,
            },
            defaultViewport: 'iphone14',
        },
    },
};

export default preview;
