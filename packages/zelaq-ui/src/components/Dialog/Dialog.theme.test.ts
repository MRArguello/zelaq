import { describe, expect, it } from 'vitest';
import { getDialogTokens } from './Dialog.theme';
import { getIconButtonTokens } from '../IconButton/IconButton.theme';
import { lightTheme } from '../../theme/tokens';

describe('getDialogTokens', () => {
  it("reuses IconButton's own secondary-variant token resolver for the close button", () => {
    const tokens = getDialogTokens(lightTheme);
    expect(tokens.closeButton).toEqual(
      getIconButtonTokens('secondary', false, false, lightTheme),
    );
  });

  it('surface uses the raised surface color and the elevated shadow', () => {
    const tokens = getDialogTokens(lightTheme);
    expect(tokens.surface.backgroundColor).toBe(
      lightTheme.colors.surfaceRaised,
    );
    expect(tokens.shadow).toBe(lightTheme.shadow.elevated);
  });

  it('backdrop uses the dedicated scrim color, not a raw color with inline opacity', () => {
    expect(getDialogTokens(lightTheme).backdropColor).toBe(
      lightTheme.colors.backdrop,
    );
  });
});
