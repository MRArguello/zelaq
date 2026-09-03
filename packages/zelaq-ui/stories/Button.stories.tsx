import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import { Search, Plus } from 'lucide-react';
import { Button } from '../src';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { onPress: fn() },
  argTypes: {
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });

    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledOnce();

    const restingOpacity = getComputedStyle(button).opacity;
    await fireEvent.mouseDown(button);
    await waitFor(() =>
      expect(getComputedStyle(button).opacity).not.toBe(restingOpacity),
    );
    await fireEvent.mouseUp(button);
    await waitFor(() =>
      expect(getComputedStyle(button).opacity).toBe(restingOpacity),
    );
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Link: Story = {
  name: 'Link-styled',
  args: {
    variant: 'link',
    children: 'View documentation',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onPress).not.toHaveBeenCalled();
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
    accessibilityHint:
      'Permanently deletes your account and all associated data',
    children: 'Delete Account',
  },
};

export const NoAnimation: Story = {
  name: 'Pressed feedback disabled',
  args: {
    animated: false,
    children: 'Button',
  },
};
