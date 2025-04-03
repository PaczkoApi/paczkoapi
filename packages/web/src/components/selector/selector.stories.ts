import type { Meta, StoryObj } from '@storybook/web-components';

import type { Components } from '../../components';

const meta: Meta<Components.PaczkoapiSelector> = {
    title: 'Point selector',
    component: 'paczkoapi-selector',
    tags: ['autodocs'],
    parameters: {
        actions: {
            handles: ['pointSelected'],
        },
    },
};

export default meta;

export const AllProvidersWithPrices: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
        prices: {
            inpost: 10,
            dhl: 15,
        },
    },
};

export const AllProvidersWithoutPrices: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
    },
};

export const Inpost: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
        providers: ['inpost'],
        prices: {
            inpost: 10,
        },
    },
};

export const Dhl: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
        providers: ['dhl'],
        prices: {
            dhl: 15,
        },
    },
};

export const NoRadio: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
        showRadio: false,
    },
};

export const BorderTheme: StoryObj<Components.PaczkoapiSelector> = {
    args: {
        addressStreet: 'ul. Wspólna 67',
        addressCity: 'Warszawa',
        addressPostalCode: '00-687',
        prices: {
            inpost: 10,
            dhl: 15,
        },
    },
};
