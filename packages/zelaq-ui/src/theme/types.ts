export interface ColorTokens {
    primary: string
    primaryPressed: string
    primaryDisabled: string
    secondaryBackground: string
    secondaryBorder: string
    secondaryText: string
    textOnPrimary: string
    textDefault: string
    textMuted: string
    textInverse: string
    textDanger: string
    textSuccess: string
}

export interface SpaceTokens {
    sm: number
    md: number
    '2md': number
    base: number
    lg: number
    xl: number
    '2xl': number
    '3xl': number
    '4xl': number
}

export interface RadiiTokens {
    sm: number
    md: number
    pill: number
}

export interface FontFamilyTokens {
    sans: string
}

export interface TypographyStyle {
    fontFamily: string
    fontSize: number
    fontWeight: '400' | '500' | '600' | '700'
    lineHeight: number
}

export interface TypographyTokens {
    fontFamily: FontFamilyTokens
    button: TypographyStyle
    bodyXxs: TypographyStyle
    bodyXs: TypographyStyle
    bodySmall: TypographyStyle
    body: TypographyStyle
    subheading: TypographyStyle
    heading4: TypographyStyle
    heading3: TypographyStyle
    heading2: TypographyStyle
    heading1: TypographyStyle
    hero4: TypographyStyle
    hero3: TypographyStyle
    hero2: TypographyStyle
    hero1: TypographyStyle
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
