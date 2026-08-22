import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
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
};

export const WithHelperText: Story = {
  name: 'With helper text',
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'Use your work email.',
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    label: 'Invalid email',
    value: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
  },
};

export const DisabledState: Story = {
  name: 'Disabled',
  args: {
    label: 'Disabled field',
    value: 'Unavailable',
    disabled: true,
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
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'What are you building?',
    multiline: true,
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
