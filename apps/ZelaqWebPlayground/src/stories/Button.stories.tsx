import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Search, Plus } from 'lucide-react';
import { Button } from 'zelaq-ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const WithStartIcon: Story = {
  name: 'With leading icon',
  args: {
    startIcon: <Search size={16} />,
    children: 'Search',
  },
};

export const WithEndIcon: Story = {
  name: 'With trailing icon',
  args: {
    endIcon: <Plus size={16} />,
    children: 'Add item',
  },
};

export const WithAccessibilityHint: Story = {
  name: 'Destructive action with hint',
  args: {
    variant: 'secondary',
    accessibilityHint: 'Permanently deletes your account and all associated data',
    children: 'Delete Account',
  },
};
