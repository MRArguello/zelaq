/**
 * UIProvider - Platform-agnostic provider for theming
 */

import React, { createContext, useContext } from 'react';
import { ThemeProvider } from '../styles';
import { createTheme, createThemeWithFunction } from '../theme/utils';

import { defaultTheme } from '../theme/tokens';
import type { Theme, ThemeProviderProps } from '../theme/types';

/**
 * Theme context for accessing the current theme
 */
const ThemeContext = createContext<Theme | null>(null);

/**
 * Resolve theme from various input types
 */
function resolveTheme(themeInput?: Theme | Partial<Theme> | ((base: Theme) => Theme)): Theme {
    if (!themeInput) {
        return defaultTheme;
    }

    if (typeof themeInput === 'function') {
        return createThemeWithFunction(themeInput);
    }

    if (typeof themeInput === 'object') {
        return createTheme(themeInput);
    }

    return defaultTheme;
}

/**
 * UIProvider component that wraps styled-components ThemeProvider
 *
 * @param props - Provider configuration
 * @param props.theme - Theme or theme function
 * @param props.mode - Color mode (light/dark/system)
 * @param props.children - Child components
 */
export const UIProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = ({
    theme: themeInput,
    mode: _mode = 'light',
    children,
}) => {
    const resolvedTheme = resolveTheme(themeInput);

    return (
        <ThemeProvider theme={resolvedTheme}>
            <ThemeContext.Provider value={resolvedTheme}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

/**
 * Hook to access the current theme
 *
 * @returns The current theme object
 * @throws Error if used outside UIProvider
 */
export function useTheme(): Theme {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error('useTheme must be used within a UIProvider');
    }

    return theme;
}
