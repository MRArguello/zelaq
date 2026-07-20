/**
 * Theme types and interfaces
 */
export interface ColorTokens {
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
export interface SpacingTokens {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
export interface RadiiTokens {
    sm: number;
    md: number;
    lg: number;
    full: number;
}
export interface TypographyTokens {
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
export interface Theme {
    colors: ColorTokens;
    spacing: SpacingTokens;
    radii: RadiiTokens;
    typography: TypographyTokens;
}
export interface ThemeProviderProps {
    theme?: Theme | Partial<Theme> | ((base: Theme) => Theme);
    mode?: 'light' | 'dark' | 'system';
    children?: React.ReactNode;
}
//# sourceMappingURL=types.d.ts.map