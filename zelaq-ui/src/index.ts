/**
 * @zelaq/ui - Cross-platform component library
 *
 * Re-export main exports for convenience
 */
export * from './components/Button/Button';
export { UIProvider, useTheme } from './provider';
export { defaultTheme, createTheme, createThemeWithFunction } from './theme';
export type { Theme, ColorTokens, SpacingTokens, RadiiTokens, TypographyTokens, ThemeProviderProps } from './theme';
