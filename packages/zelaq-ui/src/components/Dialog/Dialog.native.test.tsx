import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Dialog } from './Dialog.native';

async function renderDialog(
  props: Partial<React.ComponentProps<typeof Dialog>> = {},
) {
  const onClose = jest.fn();
  await render(
    <Dialog
      open
      title="Delete project"
      onClose={onClose}
      testID="dialog"
      {...props}
    >
      <RNText>Are you sure?</RNText>
    </Dialog>,
  );
  return { onClose };
}

function flattenStyle(style: unknown): Record<string, unknown> {
  return Array.isArray(style)
    ? Object.assign({}, ...style.map(flattenStyle))
    : ((style as Record<string, unknown>) ?? {});
}

describe('Dialog (native)', () => {
  it('renders nothing when closed', async () => {
    await render(
      <Dialog open={false} onClose={jest.fn()}>
        <RNText>content</RNText>
      </Dialog>,
    );
    expect(screen.queryByText('content')).toBeNull();
  });

  it('renders title and children when open', async () => {
    await renderDialog();
    expect(screen.getByText('Delete project')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('close button calls onClose', async () => {
    const { onClose } = await renderDialog();
    fireEvent.press(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('backdrop press calls onClose by default', async () => {
    const { onClose } = await renderDialog();
    fireEvent.press(screen.getByTestId('dialog-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('backdrop press does nothing when closeOnBackdropPress is false', async () => {
    const { onClose } = await renderDialog({ closeOnBackdropPress: false });
    fireEvent.press(screen.getByTestId('dialog-backdrop'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('Android back button (Modal onRequestClose) calls onClose', async () => {
    const { onClose } = await renderDialog();
    fireEvent(screen.getByTestId('dialog'), 'requestClose');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('sheet presentation is always full width', async () => {
    await renderDialog({ presentation: 'sheet' });
    const surface = screen.getByTestId('dialog-surface');
    expect(flattenStyle(surface.props.style).width).toBe('100%');
  });

  it('dialog presentation has the guaranteed minimum size', async () => {
    await renderDialog({ presentation: 'dialog' });
    const surface = screen.getByTestId('dialog-surface');
    const style = flattenStyle(surface.props.style);
    expect(style.minWidth).toBe(280);
    expect(style.minHeight).toBe(180);
  });
});
