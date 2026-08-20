import type { Theme } from './types'

export const colors = {
    primary: '#111827',
    primaryPressed: '#1f2937',
    primaryDisabled: '#9ca3af',
    secondaryBackground: '#ffffff',
    secondaryBorder: '#d1d5db',
    secondaryText: '#111827',
    textOnPrimary: '#ffffff',
    textDefault: '#111827',
    textMuted: '#6b7280',
    textInverse: '#ffffff',
    textDanger: '#dc2626',
    textSuccess: '#15803d',
} as const

export const darkColors = {
    primary: '#e5e7eb',
    primaryPressed: '#d1d5db',
    primaryDisabled: '#4b5563',
    secondaryBackground: '#1f2937',
    secondaryBorder: '#374151',
    secondaryText: '#f9fafb',
    textOnPrimary: '#111827',
    textDefault: '#f9fafb',
    textMuted: '#9ca3af',
    textInverse: '#111827',
    textDanger: '#f87171',
    textSuccess: '#4ade80',
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

export const lightTheme: Theme = {
    colors,
    space,
    radii,
    typography,
    sizes,
    opacity,
}

export const darkTheme: Theme = {
    colors: darkColors,
    space,
    radii,
    typography,
    sizes,
    opacity,
}

/** Alias for lightTheme — default param for resolvers called without an explicit theme. */
export const defaultTheme: Theme = lightTheme
