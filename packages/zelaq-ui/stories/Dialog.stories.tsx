import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor, waitForElementToBeRemoved, within } from 'storybook/test';
import { Dialog, Stack, Text, Button, Input } from '../src';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  args: { onClose: fn(), open: false, children: null },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

type DialogStoryProps = Omit<React.ComponentProps<typeof Dialog>, 'open' | 'onClose'>
function DialogDemo({ triggerLabel, ...args }: DialogStoryProps & { triggerLabel: string }) {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open responsive dialog' }));

    const dialog = await screen.findByRole('dialog', { name: 'Delete project' });
    // Focus moves into the surface on open — see Dialog.tsx's minimal focus-management effect.
    await waitFor(() => expect(document.activeElement).toBe(dialog));

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await screen.findByRole('dialog', { name: 'Confirm required' });

    await userEvent.click(screen.getByRole('presentation'));
    // closeOnBackdropPress: false — the backdrop click above must not have closed it.
    await expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
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

export const LongContent: Story = {
  name: 'Long content (centered)',
  render: (args) => <DialogDemo {...args} triggerLabel="Open dialog with long content" />,
  args: {
    title: 'Terms of service',
    presentation: 'dialog',
    children: (
      <Stack gap="md">
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i}>Paragraph {i + 1} — long enough content to exceed the viewport height.</Text>
        ))}
        <Button>Accept</Button>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await screen.findByRole('dialog', { name: 'Interactive example' });

    await userEvent.keyboard('{Escape}');
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  },
};
