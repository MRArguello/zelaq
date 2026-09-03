import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Input } from './Input.native';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Array.isArray(style)
    ? Object.assign({}, ...style.map(flattenStyle))
    : ((style as Record<string, unknown>) ?? {});
}

// The focus-driven border-color Animated.timing schedules a real timer on every mount (even a
// 0 -> 0 no-op animation for the not-yet-focused initial state). It settles on its own shortly
// after each test finishes, which React logs as an act() warning since nothing here awaits it —
// harmless (doesn't fail any test), and enabling fake timers to suppress it interfered with the
// async render() call itself (nothing mounted). Left as a known, cosmetic-only nuance.
describe('Input (native)', () => {
  it('calls onChangeText with the typed value', async () => {
    const onChangeText = jest.fn();
    await render(<Input label="Name" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByLabelText('Name'), 'Ada');
    expect(onChangeText).toHaveBeenCalledWith('Ada');
  });

  it('controlled value round-trips', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('');
      return <Input label="Name" value={value} onChangeText={setValue} />;
    }
    await render(<Controlled />);
    await fireEvent.changeText(screen.getByLabelText('Name'), 'Ada');
    expect(screen.getByLabelText('Name').props.value).toBe('Ada');
  });

  it('disabled: not editable, reflected in accessibilityState', async () => {
    await render(<Input label="Name" disabled />);
    const input = screen.getByLabelText('Name');
    expect(input.props.editable).toBe(false);
    expect(input.props.accessibilityState).toEqual({ disabled: true });
  });

  it('error message takes priority over helper text and becomes the accessibility hint', async () => {
    await render(
      <Input
        label="Email"
        helperText="Use your work email."
        errorMessage="Enter a valid email."
      />,
    );
    expect(screen.getByLabelText('Email').props.accessibilityHint).toBe(
      'Enter a valid email.',
    );
    expect(screen.getByText('Enter a valid email.')).toBeTruthy();
    expect(screen.queryByText('Use your work email.')).toBeNull();
  });

  it('multiline switches TextInput into its own multiline mode with the shared min-height', async () => {
    await render(<Input label="Description" multiline />);
    const input = screen.getByLabelText('Description');
    expect(input.props.multiline).toBe(true);
    expect(flattenStyle(input.props.style).minHeight).toBe(96);
  });
});
