import type { Theme } from './types'

export const colors = {
    primary: '#111827',
    primaryPressed: '#1f2937',
    primaryDisabled: '#9ca3af',
    secondaryBackground: '#ffffff',
    secondaryBorder: '#d1d5db',
    secondaryText: '#111827',
    textOnPrimary: '#ffffff',
} as const

export const darkColors = {
    primary: '#e5e7eb',
    primaryPressed: '#d1d5db',
    primaryDisabled: '#4b5563',
    secondaryBackground: '#1f2937',
    secondaryBorder: '#374151',
    secondaryText: '#f9fafb',
    textOnPrimary: '#111827',
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
    button: {
        fontSize: 16,
        fontWeight: '600' as const,
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

/** Alias for lightTheme — internal fallback used when no ZelaqProvider is present. */
export const defaultTheme: Theme = lightTheme
