import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'View documentation' });
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveAttribute('href', 'https://storybook.js.org');
  },
};

export const WithOnPress: Story = {
  name: 'With onPress',
  args: {
    href: 'https://storybook.js.org',
    children: 'Track this click',
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Track this click' });
    link.addEventListener('click', (event) => event.preventDefault());
    await userEvent.click(link);
    await expect(args.onPress).toHaveBeenCalledOnce();
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
