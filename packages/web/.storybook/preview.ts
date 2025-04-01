import { setApiLocal } from '@paczkoapi/common';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/web-components';

import { defineCustomElements } from '../dist/loader';
import './styles.scss';

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
