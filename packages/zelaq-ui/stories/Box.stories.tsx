import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector('div');
    await expect(box).toHaveStyle({ width: '200px', height: '120px' });
  },
};

export const WithOnClick: Story = {
  name: 'With passthrough onClick',
  args: {
    style: { width: 120, height: 60, background: '#F4F8F7', cursor: 'pointer' },
    onClick: fn(),
    children: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Click me'));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const WithContent: Story = {
  name: 'With content',
  args: {
    style: { width: 240, padding: 16, background: '#F4F8F7', border: '1px solid #7B9490' },
    children: <Text>Any content — Box has no layout opinion of its own.</Text>,
  },
};
