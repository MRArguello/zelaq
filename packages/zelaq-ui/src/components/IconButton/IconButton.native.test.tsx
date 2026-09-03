import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { IconButton } from './IconButton.native';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Array.isArray(style)
    ? Object.assign({}, ...style.map(flattenStyle))
    : ((style as Record<string, unknown>) ?? {});
}

const icon = <RNText>icon</RNText>;

describe('IconButton (native)', () => {
  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(
      <IconButton
        icon={icon}
        accessibilityLabel="Open settings"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Open settings'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disabled: does not call onPress, reflects in accessibilityState', async () => {
    const onPress = jest.fn();
    await render(
      <IconButton
        icon={icon}
        accessibilityLabel="Close"
        onPress={onPress}
        disabled
      />,
    );
    const button = screen.getByLabelText('Close');
    expect(button.props.accessibilityState).toEqual({
      disabled: true,
      selected: false,
      busy: false,
    });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('loading implies disabled and sets busy state', async () => {
    const onPress = jest.fn();
    await render(
      <IconButton
        icon={icon}
        accessibilityLabel="Load more"
        onPress={onPress}
        loading
      />,
    );
    const button = screen.getByLabelText('Load more');
    expect(button.props.accessibilityState).toEqual({
      disabled: true,
      selected: false,
      busy: true,
    });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('selected reflects in accessibilityState', async () => {
    await render(
      <IconButton
        icon={icon}
        accessibilityLabel="Toggle filter"
        onPress={jest.fn()}
        selected
      />,
    );
    expect(
      screen.getByLabelText('Toggle filter').props.accessibilityState,
    ).toEqual({
      disabled: false,
      selected: true,
      busy: false,
    });
  });

  // Same regression guard as Button — onPressIn/onPressOut driving the press feedback.
  it('shows pressed feedback on press in, reverts on press out', async () => {
    await render(
      <IconButton
        icon={icon}
        accessibilityLabel="Open settings"
        onPress={jest.fn()}
      />,
    );
    const button = screen.getByLabelText('Open settings');

    const restingOpacity = flattenStyle(button.props.style).opacity;
    await fireEvent(button, 'pressIn');
    expect(flattenStyle(button.props.style).opacity).not.toBe(restingOpacity);
    await fireEvent(button, 'pressOut');
    expect(flattenStyle(button.props.style).opacity).toBe(restingOpacity);
  });
});
