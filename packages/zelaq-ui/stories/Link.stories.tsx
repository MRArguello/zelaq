import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Link, Stack, Text } from '../src';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://storybook.js.org',
    children: 'View documentation',
  },
};

export const WithOnPress: Story = {
  name: 'With onPress',
  args: {
    href: 'https://storybook.js.org',
    children: 'Track this click',
    onPress: fn(),
  },
};

export const InBodyText: Story = {
  name: 'Inline within body text',
  render: (args) => (
    <Stack gap="sm" style={{ width: 280 }}>
      <Text>
        Read the <Link {...args} /> for the full setup guide.
      </Text>
    </Stack>
  ),
  args: {
    href: 'https://storybook.js.org',
    children: 'Storybook docs',
  },
};
