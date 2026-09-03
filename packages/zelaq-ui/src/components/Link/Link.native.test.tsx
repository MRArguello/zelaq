import * as React from 'react';
import { Linking } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Link } from './Link.native';

describe('Link (native)', () => {
  it('opens the href via Linking.openURL when pressed', async () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    await render(<Link href="https://example.com">Visit</Link>);
    await fireEvent.press(screen.getByText('Visit'));
    expect(openURL).toHaveBeenCalledWith('https://example.com');
    openURL.mockRestore();
  });

  // onPress is additive, not a replacement — matches a real anchor's onClick semantics, which
  // doesn't prevent navigation unless the consumer calls preventDefault.
  it('onPress fires in addition to navigation, not instead of it', async () => {
    jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    const onPress = jest.fn();
    await render(
      <Link href="https://example.com" onPress={onPress}>
        Visit
      </Link>,
    );
    await fireEvent.press(screen.getByText('Visit'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com');
    jest.restoreAllMocks();
  });

  it('renders with accessibilityRole="link"', async () => {
    jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    await render(<Link href="https://example.com">Visit</Link>);
    expect(screen.getByText('Visit').props.accessibilityRole).toBe('link');
    jest.restoreAllMocks();
  });
});
