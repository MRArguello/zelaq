import { T as Theme } from './types-helcxQac.js';
export { C as ColorTokens, R as RadiiTokens, S as SpacingTokens, a as ThemeProviderProps, b as TypographyTokens } from './types-helcxQac.js';

/**
 * Default theme tokens - light mode
 */

declare const defaultTheme: Theme;

/**
 * Theme utilities for creating and merging themes
 */

/**
 * Create a custom theme by merging with the default theme
 *
 * @param baseOverrides - Theme overrides to apply
 * @returns A new merged theme
 */
declare function createTheme(baseOverrides?: Partial<Theme>): Theme;
/**
 * Create a theme with a function that receives the default theme
 *
 * @param themeFn - Function that receives the default theme and returns overrides
 * @returns A new merged theme
 */
declare function createThemeWithFunction(themeFn: (base: Theme) => Partial<Theme>): Theme;

export { Theme, createTheme, createThemeWithFunction, defaultTheme };
