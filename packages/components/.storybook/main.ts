import type { StorybookConfig } from '@storybook/html-vite';

import { resolveProjectPath } from '@nzyme/project-utils';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        resolveProjectPath('@storybook/addon-essentials'),
        resolveProjectPath('@chromatic-com/storybook'),
        resolveProjectPath('@storybook/addon-interactions'),
    ],
    framework: {
        name: resolveProjectPath('@storybook/html-vite'),
        options: {},
    },
    refs: {
        react: {
            title: 'React',
            url: 'http://localhost:9001',
        },
        vue: {
            title: 'Vue',
            url: 'http://localhost:9002',
        },
    },
};

export default config;
