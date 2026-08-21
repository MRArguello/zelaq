import type { Theme } from './types'
import { darkPalette, lightPalette } from './palette'

// "Ink + mineral teal" — verified against WCAG contrast minimums (4.5:1 text, 3:1 UI
// boundaries) for every pair components actually render. Values come from palette.ts;
// this layer is what assigns them meaning.
export const colors = {
    primary: lightPalette.teal600,
    primaryPressed: lightPalette.teal700,
    primaryDisabled: lightPalette.teal300,
    secondaryBackground: lightPalette.mineral75,
    secondaryBorder: lightPalette.mineral500,
    secondaryText: lightPalette.ink900,
    textOnPrimary: lightPalette.mineral50,
    textDefault: lightPalette.ink900,
    textMuted: lightPalette.mineral700,
    textInverse: lightPalette.mineral50,
    textDanger: lightPalette.red600,
    textSuccess: lightPalette.green600,
    background: lightPalette.mineral100,
    surface: lightPalette.mineral25,
    surfaceRaised: lightPalette.mineral0,
    fieldBackground: lightPalette.mineral0,
    border: lightPalette.mineral200,
    borderFocused: lightPalette.teal600,
    fieldDisabledBackground: lightPalette.mineral300,
    fieldDisabledText: lightPalette.ink700,
    backdrop: lightPalette.inkScrim,
} as const

export const darkColors = {
    primary: darkPalette.teal400,
    primaryPressed: darkPalette.teal300,
    primaryDisabled: darkPalette.teal800,
    secondaryBackground: darkPalette.mineral600,
    secondaryBorder: darkPalette.mineral400,
    secondaryText: darkPalette.mineral100,
    textOnPrimary: darkPalette.ink900,
    textDefault: darkPalette.mineral100,
    textMuted: darkPalette.mineral300,
    textInverse: darkPalette.ink900,
    textDanger: darkPalette.red300,
    textSuccess: darkPalette.green300,
    background: darkPalette.mineral900,
    surface: darkPalette.mineral800,
    surfaceRaised: darkPalette.mineral700,
    fieldBackground: darkPalette.mineral700,
    border: darkPalette.mineral450,
    borderFocused: darkPalette.teal400,
    fieldDisabledBackground: darkPalette.mineral500,
    fieldDisabledText: darkPalette.mineral250,
    backdrop: darkPalette.inkScrim,
} as const

export const space = {
    sm: 4,
    md: 8,
    '2md': 12,
    base: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 64,
    '4xl': 96,
} as const

export const radii = {
    xs:4,
    sm: 8,
    md: 10,
    pill: 999,
} as const

export const typography = {
    fontFamily: {
        sans: 'Satoshi',
    },
    button: {
        fontFamily: 'Satoshi',
        fontSize: 16,
        fontWeight: '500' as const,
        lineHeight: 20,
    },
    bodyXxs: {
        fontFamily: 'Satoshi',
        fontSize: 10,
        fontWeight: '400' as const,
        lineHeight: 16,
    },
    bodyXs: {
        fontFamily: 'Satoshi',
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 18,
    },
    bodySmall: {
        fontFamily: 'Satoshi',
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
    },
    body: {
        fontFamily: 'Satoshi',
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
    },
    subheading: {
        fontFamily: 'Satoshi',
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 32,
    },
    heading4: {
        fontFamily: 'Satoshi',
        fontSize: 20,
        fontWeight: '700' as const,
        lineHeight: 25,
    },
    heading3: {
        fontFamily: 'Satoshi',
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 30,
    },
    heading2: {
        fontFamily: 'Satoshi',
        fontSize: 32,
        fontWeight: '700' as const,
        lineHeight: 40,
    },
    heading1: {
        fontFamily: 'Satoshi',
        fontSize: 40,
        fontWeight: '700' as const,
        lineHeight: 50,
    },
    hero4: {
        fontFamily: 'Satoshi',
        fontSize: 64,
        fontWeight: '700' as const,
        lineHeight: 70,
    },
    hero3: {
        fontFamily: 'Satoshi',
        fontSize: 76,
        fontWeight: '700' as const,
        lineHeight: 83,
    },
    hero2: {
        fontFamily: 'Satoshi',
        fontSize: 96,
        fontWeight: '700' as const,
        lineHeight: 105,
    },
    hero1: {
        fontFamily: 'Satoshi',
        fontSize: 120,
        fontWeight: '700' as const,
        lineHeight: 132,
    },
} as const

export const sizes = {
    touchMin: 44,
} as const

export const opacity = {
    disabled: 0.5,
    pressed: 0.85,
} as const

export const shadow = {
    elevated: {
        color: 'rgba(15, 23, 42, 0.12)',
        offsetX: 0,
        offsetY: 2,
        blurRadius: 8,
        elevation: 3,
    },
} as const

export const lightTheme: Theme = {
    colors,
    space,
    radii,
    typography,
    sizes,
    opacity,
    shadow,
}

export const darkTheme: Theme = {
    colors: darkColors,
    space,
    radii,
    typography,
    sizes,
    opacity,
    shadow,
}

/** Alias for lightTheme — default param for resolvers called without an explicit theme. */
export const defaultTheme: Theme = lightTheme
