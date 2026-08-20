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
    2: 8,
    3: 12,
    4: 16,
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
    heading: {
        fontFamily: 'Satoshi',
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 32,
    },
    body: {
        fontFamily: 'Satoshi',
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
    },
    bodySmall: {
        fontFamily: 'Satoshi',
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
    },
    label: {
        fontFamily: 'Satoshi',
        fontSize: 14,
        fontWeight: '500' as const,
        lineHeight: 20,
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
