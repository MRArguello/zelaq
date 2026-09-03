import { describe, expect, it } from 'vitest';
import { getTextTokens } from './Text.theme';
import { lightTheme } from '../../theme/tokens';

describe('getTextTokens', () => {
  it('maps each tone to its dedicated color token', () => {
    const cases = {
      default: lightTheme.colors.textDefault,
      muted: lightTheme.colors.textMuted,
      inverse: lightTheme.colors.textInverse,
      danger: lightTheme.colors.textDanger,
      success: lightTheme.colors.textSuccess,
    } as const;

    for (const [tone, expectedColor] of Object.entries(cases)) {
      expect(
        getTextTokens('body', tone as keyof typeof cases, 'left', lightTheme)
          .color,
      ).toBe(expectedColor);
    }
  });

  it('spreads the full typography scale for the given variant, not just size', () => {
    const tokens = getTextTokens('heading2', 'default', 'left', lightTheme);
    expect(tokens.fontSize).toBe(lightTheme.typography.heading2.fontSize);
    expect(tokens.fontWeight).toBe(lightTheme.typography.heading2.fontWeight);
    expect(tokens.lineHeight).toBe(lightTheme.typography.heading2.lineHeight);
    expect(tokens.fontFamily).toBe(lightTheme.typography.heading2.fontFamily);
  });

  it('passes align straight through as textAlign', () => {
    expect(
      getTextTokens('body', 'default', 'center', lightTheme).textAlign,
    ).toBe('center');
  });
});
