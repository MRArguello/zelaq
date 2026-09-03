import { describe, expect, it } from 'vitest';
import { getInputTokens } from './Input.theme';
import { lightTheme } from '../../theme/tokens';

describe('getInputTokens', () => {
  it('border color priority: disabled > error > focused > default', () => {
    expect(
      getInputTokens({ disabled: true, error: true, focused: true }, lightTheme)
        .container.borderColor,
    ).toBe(lightTheme.colors.border);

    expect(
      getInputTokens(
        { disabled: false, error: true, focused: true },
        lightTheme,
      ).container.borderColor,
    ).toBe(lightTheme.colors.textDanger);

    expect(
      getInputTokens(
        { disabled: false, error: false, focused: true },
        lightTheme,
      ).container.borderColor,
    ).toBe(lightTheme.colors.borderFocused);

    expect(
      getInputTokens(
        { disabled: false, error: false, focused: false },
        lightTheme,
      ).container.borderColor,
    ).toBe(lightTheme.colors.secondaryBorder);
  });

  it('disabled uses its own dedicated background/text colors, not a dimmed default', () => {
    const disabled = getInputTokens(
      { disabled: true, error: false, focused: false },
      lightTheme,
    );
    expect(disabled.container.backgroundColor).toBe(
      lightTheme.colors.fieldDisabledBackground,
    );
    expect(disabled.text.color).toBe(lightTheme.colors.fieldDisabledText);
    // Not dimmed via opacity — see the comment in Input.theme.ts for why.
    expect(disabled.container.opacity).toBe(1);
  });

  it('enabled uses the normal field background/text colors regardless of focus/error', () => {
    const tokens = getInputTokens(
      { disabled: false, error: true, focused: true },
      lightTheme,
    );
    expect(tokens.container.backgroundColor).toBe(
      lightTheme.colors.fieldBackground,
    );
    expect(tokens.text.color).toBe(lightTheme.colors.textDefault);
  });
});
