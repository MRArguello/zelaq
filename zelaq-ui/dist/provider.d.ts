import React from 'react';
import { a as ThemeProviderProps, T as Theme } from './types-helcxQac.js';

/**
 * UIProvider - Platform-agnostic provider for theming
 */

/**
 * UIProvider component that wraps styled-components ThemeProvider
 *
 * @param props - Provider configuration
 * @param props.theme - Theme or theme function
 * @param props.mode - Color mode (light/dark/system)
 * @param props.children - Child components
 */
declare const UIProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>>;
/**
 * Hook to access the current theme
 *
 * @returns The current theme object
 * @throws Error if used outside UIProvider
 */
declare function useTheme(): Theme;

export { UIProvider, useTheme };
