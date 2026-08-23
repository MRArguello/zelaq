import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Input, Stack } from '../src';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: { onChangeText: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Ada Lovelace',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Name');
    await userEvent.type(input, 'Ada');
    await expect(args.onChangeText).toHaveBeenLastCalledWith('Ada');
  },
};

export const WithHelperText: Story = {
  name: 'With helper text',
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'Use your work email.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Email address');
    const describedById = input.getAttribute('aria-describedby');
    await expect(describedById).toBeTruthy();
    await expect(document.getElementById(describedById!)).toHaveTextContent('Use your work email.');
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    label: 'Invalid email',
    value: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Invalid email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Enter a valid email address.')).toBeInTheDocument();
  },
};

export const DisabledState: Story = {
  name: 'Disabled',
  args: {
    label: 'Disabled field',
    value: 'Unavailable',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Disabled field')).toBeDisabled();
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
  args: {
    label: 'Controlled value',
    placeholder: 'Type something…',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Controlled value') as HTMLInputElement;
    await userEvent.type(input, 'Hello');
    await waitFor(() => expect(input.value).toBe('Hello'));
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'What are you building?',
    multiline: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText('Description');
    await expect(textarea.tagName).toBe('TEXTAREA');
    await userEvent.type(textarea, 'A design system');
    await expect(args.onChangeText).toHaveBeenLastCalledWith('A design system');
  },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <Stack gap="md" style={{ width: 280 }}>
      <Input label="Name" placeholder="Ada Lovelace" />
      <Input label="Email address" placeholder="you@example.com" helperText="Use your work email." />
      <Input label="Invalid email" value="not-an-email" errorMessage="Enter a valid email address." />
      <Input label="Disabled field" value="Unavailable" disabled />
    </Stack>
  ),
};
