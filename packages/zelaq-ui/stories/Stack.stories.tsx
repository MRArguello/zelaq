import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack, Button, Text } from '../src';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Stack gap="lg">
      <Text variant="heading2">Zelaq UI</Text>
      <Text tone="muted">A themeable cross-platform component library.</Text>
      <Button>Continue</Button>
    </Stack>
  ),
};

export const GapValues: Story = {
  name: 'Gap values',
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {(['sm', 'md', 'base', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <Text variant="bodySmall" tone="muted">
            gap=&quot;{gap}&quot;
          </Text>
          <Stack gap={gap} style={{ background: '#f3f4f6', padding: 8, borderRadius: 8 }}>
            <div style={{ width: 60, height: 20, background: '#9ca3af' }} />
            <div style={{ width: 60, height: 20, background: '#9ca3af' }} />
            <div style={{ width: 60, height: 20, background: '#9ca3af' }} />
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const CenterAligned: Story = {
  name: 'Center alignment',
  render: () => (
    <Stack gap="md" align="center" style={{ width: 320, background: '#f3f4f6', padding: 16 }}>
      <Text variant="body">Centered</Text>
      <Button>Short</Button>
      <Button>A longer button label</Button>
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  name: 'Space-between justification',
  render: () => (
    <Stack
      gap="md"
      justify="between"
      style={{ height: 200, width: 240, background: '#f3f4f6', padding: 16 }}
    >
      <Text variant="body">Top</Text>
      <Text variant="body">Middle</Text>
      <Text variant="body">Bottom</Text>
    </Stack>
  ),
};
