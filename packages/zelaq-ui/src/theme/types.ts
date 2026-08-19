export interface ColorTokens {
    primary: string
    primaryPressed: string
    primaryDisabled: string
    secondaryBackground: string
    secondaryBorder: string
    secondaryText: string
    textOnPrimary: string
}

export interface SpaceTokens {
    2: number
    3: number
    4: number
}

export interface RadiiTokens {
    sm: number
    md: number
    pill: number
}

export interface TypographyTokens {
    button: {
        fontSize: number
        fontWeight: '400' | '500' | '600' | '700'
        lineHeight: number
    }
}

export interface SizeTokens {
    touchMin: number
}

export interface OpacityTokens {
    disabled: number
    pressed: number
}

export interface Theme {
    colors: ColorTokens
    space: SpaceTokens
    radii: RadiiTokens
    typography: TypographyTokens
    sizes: SizeTokens
    opacity: OpacityTokens
}

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type ThemeOverride = DeepPartial<Theme>

export type ThemeMode = 'light' | 'dark' | 'system'
