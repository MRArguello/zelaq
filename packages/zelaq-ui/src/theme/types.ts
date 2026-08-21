export interface ColorTokens {
    primary: string
    primaryPressed: string
    primaryDisabled: string
    /** Button/IconButton "secondary" variant background only — not a general neutral-surface slot. */
    secondaryBackground: string
    /** Button/IconButton "secondary" variant border only — not a general neutral-surface slot. */
    secondaryBorder: string
    /** Button/IconButton "secondary" variant text/icon color only. */
    secondaryText: string
    textOnPrimary: string
    textDefault: string
    textMuted: string
    textInverse: string
    textDanger: string
    textSuccess: string
    /** Page-level background — distinct from the component-surface tokens below. */
    background: string
    /** Default component surface, one step above background. Card's subtle/outlined variants. */
    surface: string
    /** Elevated surface — one step above surface. Shadow-based elevation specifically; not a
     *  generic "brighter surface" slot — see fieldBackground for that. Card's elevated variant
     *  and Dialog, which is always elevated. */
    surfaceRaised: string
    /** Form-field surface (Input). Deliberately separate from surfaceRaised — a field being
     *  visually brighter than its surroundings isn't the same concept as a Card being physically
     *  raised, even though they want a similar value today. */
    fieldBackground: string
    /** General-purpose divider/boundary. Input's disabled-state border; Card's outlined variant. */
    border: string
    /** Same value as primary in both themes today — kept as its own semantic slot so focus color
     *  can diverge from brand color later. Input's focused-state border. */
    borderFocused: string
    /** Input's disabled surface. */
    fieldDisabledBackground: string
    /** Input's disabled text. */
    fieldDisabledText: string
    /** Modal/sheet scrim — stays dark in both modes, unlike text/surface colors which invert. */
    backdrop: string
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
    xs: number
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

export interface ShadowStyle {
    /** Ready-to-use color, including alpha (e.g. an rgba string) — consumed as-is by both platforms. */
    color: string
    offsetX: number
    offsetY: number
    blurRadius: number
    /** Android-only fallback; ignored on web/iOS. */
    elevation: number
}

export interface ShadowTokens {
    elevated: ShadowStyle
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
    shadow: ShadowTokens
}

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type ThemeOverride = DeepPartial<Theme>

export type ThemeMode = 'light' | 'dark' | 'system'
