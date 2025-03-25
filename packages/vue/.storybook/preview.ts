import type { Preview } from '@storybook/vue3';

import '@paczkoapi/components/inter.scss';
import '@paczkoapi/components/theme.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
