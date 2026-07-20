import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { WebButton } from './Button';

const meta = {
  title: 'Example/Button',
  component: WebButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof WebButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button',
  },
};
