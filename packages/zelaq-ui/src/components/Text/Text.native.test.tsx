import * as React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from './Text.native';
import { lightTheme } from '../../theme/tokens';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Array.isArray(style)
    ? Object.assign({}, ...style.map(flattenStyle))
    : ((style as Record<string, unknown>) ?? {});
}

describe('Text (native)', () => {
  it('maps tone to the right color token', async () => {
    await render(<Text tone="danger">Error</Text>);
    expect(flattenStyle(screen.getByText('Error').props.style).color).toBe(
      lightTheme.colors.textDanger,
    );
  });

  it('maps variant to the full typography scale, not just size', async () => {
    await render(<Text variant="heading2">Heading</Text>);
    const style = flattenStyle(screen.getByText('Heading').props.style);
    expect(style.fontSize).toBe(lightTheme.typography.heading2.fontSize);
    expect(style.fontWeight).toBe(lightTheme.typography.heading2.fontWeight);
    expect(style.lineHeight).toBe(lightTheme.typography.heading2.lineHeight);
  });

  it('passes align straight through as textAlign', async () => {
    await render(<Text align="center">Centered</Text>);
    expect(
      flattenStyle(screen.getByText('Centered').props.style).textAlign,
    ).toBe('center');
  });
});
