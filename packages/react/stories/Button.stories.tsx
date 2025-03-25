import type { Meta, StoryObj } from '@storybook/react';
import Button from '../src/Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Secondary: Story = {
    args: {},
};
