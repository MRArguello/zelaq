import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack, Button, Text } from '../src';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Always a composed Text/Button tree in these stories — docgen shows it as a plain string,
    // but editing it as text would just replace the composition, not demonstrate anything.
    children: { control: false },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    gap: 'lg',
    children: (
      <>
        <Text variant="heading2">Zelaq UI</Text>
        <Text tone="muted">A themeable cross-platform component library.</Text>
        <Button>Continue</Button>
      </>
    ),
  },
};

export const CenterAligned: Story = {
  name: 'Center alignment',
  args: {
    gap: 'md',
    align: 'center',
    style: { width: 320, background: '#f3f4f6', padding: 16 },
    children: (
      <>
        <Text variant="body">Centered</Text>
        <Button>Short</Button>
        <Button>A longer button label</Button>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  name: 'Space-between justification',
  args: {
    gap: 'md',
    justify: 'between',
    style: { height: 200, width: 240, background: '#f3f4f6', padding: 16 },
    children: (
      <>
        <Text variant="body">Top</Text>
        <Text variant="body">Middle</Text>
        <Text variant="body">Bottom</Text>
      </>
    ),
  },
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
            <div style={{ width: 60, height: 20, background: '#8FAEAA' }} />
            <div style={{ width: 60, height: 20, background: '#8FAEAA' }} />
            <div style={{ width: 60, height: 20, background: '#8FAEAA' }} />
          </Stack>
        </div>
      ))}
    </div>
  ),
};
