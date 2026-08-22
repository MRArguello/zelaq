import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dialog, Stack, Text, Button, Input } from '../src';
import type { DialogProps } from '../src';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  args: { onClose: fn() },
  argTypes: {
    // Always a composed Stack/Text/Button tree in these stories — see Card/Stack for why this is
    // disabled rather than left as a broken/misleading control.
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dialog portals to document.body, and every Canvas on an MDX docs page shares one preview
// document rather than getting its own isolated iframe — so a story with a static open: true
// arg doesn't just show inside its own Canvas, it stacks on top of every other open: true story
// on the same page. Each demo below opens itself via a trigger button instead, so nothing is
// open until a user actually asks for it, on that specific canvas.
function DialogDemo({ triggerLabel, ...args }: DialogProps & { triggerLabel: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Stack gap="md" style={{ padding: 24 }}>
      <Button onPress={() => setOpen(true)}>{triggerLabel}</Button>
      <Dialog {...args} open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}

export const Responsive: Story = {
  render: (args) => <DialogDemo {...args} triggerLabel="Open responsive dialog" />,
  args: {
    title: 'Delete project',
    presentation: 'responsive',
    children: (
      <Stack gap="md">
        <Text>This action cannot be undone. Resize the window to see it switch between sheet and dialog.</Text>
        <Button>Delete</Button>
      </Stack>
    ),
  },
};

export const ForcedDialog: Story = {
  name: 'Forced dialog',
  render: (args) => <DialogDemo {...args} triggerLabel="Open centered dialog" />,
  args: {
    title: 'Edit profile',
    presentation: 'dialog',
    children: (
      <Stack gap="md">
        <Input label="Name" placeholder="Ada Lovelace" />
        <Input label="Email address" placeholder="you@example.com" />
        <Button>Save</Button>
      </Stack>
    ),
  },
};

export const ForcedSheet: Story = {
  name: 'Forced sheet',
  render: (args) => <DialogDemo {...args} triggerLabel="Open bottom sheet" />,
  args: {
    title: 'Filters',
    presentation: 'sheet',
    children: (
      <Stack gap="md">
        <Text tone="muted">Choose how results are filtered.</Text>
        <Button>Apply</Button>
      </Stack>
    ),
  },
};

export const BackdropDismissDisabled: Story = {
  name: 'Backdrop dismissal disabled',
  render: (args) => <DialogDemo {...args} triggerLabel="Open dialog" />,
  args: {
    title: 'Confirm required',
    presentation: 'dialog',
    closeOnBackdropPress: false,
    children: (
      <Stack gap="md">
        <Text>You must use the close button — tapping outside won&apos;t dismiss this.</Text>
        <Button>Acknowledge</Button>
      </Stack>
    ),
  },
};

export const NoAnimation: Story = {
  name: 'Enter/exit animation disabled',
  render: (args) => <DialogDemo {...args} triggerLabel="Open dialog (no animation)" />,
  args: {
    title: 'Instant open/close',
    presentation: 'dialog',
    animated: false,
    children: (
      <Stack gap="md">
        <Text>Opens and closes immediately — no fade/scale transition. Use the × or Escape to close.</Text>
      </Stack>
    ),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Stack gap="md" style={{ padding: 24 }}>
        <Button onPress={() => setOpen(true)}>Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Stack gap="md">
            <Text>Close with the button, the backdrop, or Escape.</Text>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </Stack>
        </Dialog>
      </Stack>
    );
  },
  args: {
    title: 'Interactive example',
    presentation: 'responsive',
  },
};
