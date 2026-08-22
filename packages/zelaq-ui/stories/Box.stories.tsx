import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Text } from '../src';

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 200, height: 120, background: '#F4F8F7', border: '1px solid #7B9490' },
  },
};

export const WithContent: Story = {
  name: 'With content',
  args: {
    style: { width: 240, padding: 16, background: '#F4F8F7', border: '1px solid #7B9490' },
    children: <Text>Any content — Box has no layout opinion of its own.</Text>,
  },
};
