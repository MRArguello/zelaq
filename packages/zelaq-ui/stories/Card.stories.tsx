import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Stack, Text, Button } from '../src';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Always a composed Stack/Text tree in these stories — docgen shows it as a plain string,
    // but editing it as text would just replace the composition, not demonstrate anything.
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
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    style: { width: 280 },
    children: statusContent,
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

export const AllVariants: Story = {
  name: 'All variants',
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
