import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Settings, Trash2, X, ChevronDown, Check, Menu, AlertCircle } from 'lucide-react';
import { IconButton } from 'zelaq-ui';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  args: { onPress: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Settings size={18} />,
    accessibilityLabel: 'Open settings',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: <Menu size={18} />,
    accessibilityLabel: 'Open menu',
  },
};

export const Selected: Story = {
  args: {
    icon: <Check size={18} />,
    accessibilityLabel: 'Toggle filter',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: <X size={18} />,
    accessibilityLabel: 'Close',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    icon: <ChevronDown size={18} />,
    accessibilityLabel: 'Load more',
    loading: true,
  },
};

export const WithAccessibilityHint: Story = {
  name: 'Destructive action with hint',
  args: {
    icon: <Trash2 size={18} />,
    accessibilityLabel: 'Delete file',
    accessibilityHint: 'Permanently deletes the selected file',
  },
};

export const DifferentSizes: Story = {
  name: 'Different icon sizes',
  args: {
    icon: <AlertCircle size={18} />,
    accessibilityLabel: 'Example',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} icon={<AlertCircle size={14} />} accessibilityLabel="Small" />
      <IconButton {...args} icon={<AlertCircle size={20} />} accessibilityLabel="Medium" />
      <IconButton {...args} icon={<AlertCircle size={28} />} accessibilityLabel="Large" />
    </div>
  ),
};

export const DifferentColors: Story = {
  name: 'Custom icon colors',
  args: {
    icon: <AlertCircle size={18} />,
    accessibilityLabel: 'Example',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} icon={<AlertCircle size={18} color="#f59e0b" />} accessibilityLabel="Warning" />
      <IconButton {...args} icon={<AlertCircle size={18} color="#ef4444" />} accessibilityLabel="Error" />
      <IconButton {...args} icon={<AlertCircle size={18} color="#10b981" />} accessibilityLabel="Success" />
    </div>
  ),
};
