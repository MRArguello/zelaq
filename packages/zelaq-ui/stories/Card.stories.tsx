import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Card, Stack, Text, Button } from '../src';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusContent = (
  <Stack gap="sm">
    <Text variant="heading4">Project status</Text>
    <Text tone="muted">Everything is up to date.</Text>
  </Stack>
);

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    style: { width: 280 },
    children: statusContent,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    style: { width: 280 },
    children: statusContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText('Project status').parentElement!.parentElement!;
    await expect(card).toHaveStyle({ boxShadow: 'none' });
    const borderColor = getComputedStyle(card).borderColor;
    await expect(borderColor).not.toBe('rgba(0, 0, 0, 0)');
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    style: { width: 280 },
    children: statusContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText('Project status').parentElement!.parentElement!;
    await expect(getComputedStyle(card).boxShadow).not.toBe('none');
  },
};

export const WithButton: Story = {
  name: 'Card with Text, Stack, and Button',
  args: {
    variant: 'elevated',
    style: { width: 280 },
    children: (
      <Stack gap="sm">
        <Text variant="heading4">Project status</Text>
        <Text tone="muted">Everything is up to date.</Text>
        <Button>View project</Button>
      </Stack>
    ),
  },
};

export const SemanticElement: Story = {
  name: 'Semantic element (as prop)',
  args: {
    children: statusContent,
  },
  render: () => (
    <Card as="article" variant="outlined" style={{ width: 280 }}>
      {statusContent}
    </Card>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('article')).not.toBeNull();
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  args: {
    children: statusContent,
  },
  render: () => (
    <Stack gap="lg">
      <Card variant="subtle" style={{ width: 280 }}>
        {statusContent}
      </Card>
      <Card variant="outlined" style={{ width: 280 }}>
        {statusContent}
      </Card>
      <Card variant="elevated" style={{ width: 280 }}>
        {statusContent}
      </Card>
    </Stack>
  ),
};
