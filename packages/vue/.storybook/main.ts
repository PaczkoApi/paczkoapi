import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolveProjectPath } from '@nzyme/project-utils';

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        resolveProjectPath('@storybook/addon-essentials'),
        resolveProjectPath('@storybook/addon-onboarding'),
        resolveProjectPath('@chromatic-com/storybook'),
    ],
    framework: {
        name: resolveProjectPath('@storybook/vue3-vite'),
        options: {},
    },
};

export default config;
