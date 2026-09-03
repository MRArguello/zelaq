import * as React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { Card } from './Card.native';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Array.isArray(style)
    ? Object.assign({}, ...style.map(flattenStyle))
    : ((style as Record<string, unknown>) ?? {});
}

describe('Card (native)', () => {
  it('only elevated gets shadow/elevation styles', async () => {
    await render(
      <Card testID="card" variant="elevated">
        <Text>content</Text>
      </Card>,
    );
    const style = flattenStyle(screen.getByTestId('card').props.style);
    expect(style.elevation).toBeGreaterThan(0);
    expect(style.shadowOpacity).toBe(1);
  });

  it('subtle and outlined have no shadow', async () => {
    await render(
      <Card testID="card" variant="subtle">
        <Text>content</Text>
      </Card>,
    );
    const style = flattenStyle(screen.getByTestId('card').props.style);
    expect(style.elevation).toBeUndefined();
    expect(style.shadowOpacity).toBeUndefined();
  });
});
