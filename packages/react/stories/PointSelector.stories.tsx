import type { Meta, StoryObj } from '@storybook/react';
import PointSelector from '../src/PointSelector';

const meta: Meta<typeof PointSelector> = {
    title: 'Components/PointSelector',
    component: PointSelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        address: {
            street: 'ul. Jana Pawła II 1',
            city: 'Warszawa',
            country: 'Poland',
        },
    },
};
