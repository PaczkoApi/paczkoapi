import type { StorybookConfig } from '@storybook/react-vite';
import { resolveProjectPath } from '@nzyme/project-utils';

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        resolveProjectPath('@storybook/addon-essentials'),
        resolveProjectPath('@storybook/addon-onboarding'),
        resolveProjectPath('@chromatic-com/storybook'),
        resolveProjectPath('@storybook/addon-interactions'),
    ],
    framework: {
        name: resolveProjectPath('@storybook/react-vite'),
        options: {},
    },
};

export default config;
