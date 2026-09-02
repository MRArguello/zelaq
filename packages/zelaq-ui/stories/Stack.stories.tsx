import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Stack, Button, Text } from '../src';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('div')!;
    const style = getComputedStyle(stack);
    await expect(style.display).toBe('flex');
    await expect(style.flexDirection).toBe('column');
    await expect(style.gap).not.toBe('0px');
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
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('div')!;
    await expect(getComputedStyle(stack).alignItems).toBe('center');
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
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('div')!;
    await expect(getComputedStyle(stack).justifyContent).toBe('space-between');
  },
};

export const SemanticElement: Story = {
  name: 'Semantic element (as prop)',
  args: {
    children: null,
  },
  render: () => (
    <>
      <Stack as="nav" gap="sm" style={{ background: '#f3f4f6', padding: 12 }}>
        <Text variant="bodySmall">Rendered as &lt;nav&gt;</Text>
      </Stack>
      <Stack as="section" gap="sm" style={{ background: '#f3f4f6', padding: 12, marginTop: 8 }}>
        <Text variant="bodySmall">Rendered as &lt;section&gt;</Text>
      </Stack>
    </>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('nav')).not.toBeNull();
    await expect(canvasElement.querySelector('section')).not.toBeNull();
  },
};

export const GapValues: Story = {
  name: 'Gap values',
  args: {
    children: null,
  },
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
