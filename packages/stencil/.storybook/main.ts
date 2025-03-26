import type { StorybookConfig } from '@storybook/react-vite';
import { resolveProjectPath } from '@nzyme/project-utils';
import { defineConfig, mergeConfig } from 'vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        resolveProjectPath('@storybook/addon-essentials'),
        resolveProjectPath('@storybook/addon-events'),
        resolveProjectPath('@chromatic-com/storybook'),
    ],
    framework: {
        name: resolveProjectPath('@storybook/web-components-vite'),
        options: {},
    },
    async viteFinal(config, { configType }) {
        if (configType !== 'DEVELOPMENT') {
            return config;
        }

        const extended = defineConfig({
            build: {
                // this is set to 'dist' by default which causes hot-reloading for stencil components to break
                // see: https://vitejs.dev/config/server-options.html#server-watch
                // setting it to anything other than dist fixes the issue
                outDir: 'dist-vite',
            },
        });

        return mergeConfig(config, extended);
    },
};

export default config;
