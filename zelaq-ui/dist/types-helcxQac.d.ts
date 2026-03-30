/**
 * Theme types and interfaces
 */
interface ColorTokens {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
}
interface SpacingTokens {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
interface RadiiTokens {
    sm: number;
    md: number;
    lg: number;
    full: number;
}
interface TypographyTokens {
    fontSizeXs: number;
    fontSizeSm: number;
    fontSizeMd: number;
    fontSizeLg: number;
    fontSizeXl: number;
    fontWeight: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
    };
}
interface Theme {
    colors: ColorTokens;
    spacing: SpacingTokens;
    radii: RadiiTokens;
    typography: TypographyTokens;
}
interface ThemeProviderProps {
    theme?: Theme | Partial<Theme> | ((base: Theme) => Theme);
    mode?: 'light' | 'dark' | 'system';
    children?: React.ReactNode;
}

export type { ColorTokens as C, RadiiTokens as R, SpacingTokens as S, Theme as T, ThemeProviderProps as a, TypographyTokens as b };
