import * as React from 'react'
import { defaultTheme } from './tokens'
import type { Theme, ThemeOverride } from './types'

const ThemeContext = React.createContext<Theme>(defaultTheme)

function mergeTheme(base: Theme, override?: ThemeOverride): Theme {
    if (!override) return base
    const merged = { ...base }
    for (const key of Object.keys(override) as Array<keyof Theme>) {
        Object.assign(merged, { [key]: { ...base[key], ...override[key] } })
    }
    return merged
}

export type UIProviderProps = {
    theme?: ThemeOverride
    children?: React.ReactNode
}

export function UIProvider({ theme, children }: UIProviderProps) {
    const value = React.useMemo(() => mergeTheme(defaultTheme, theme), [theme])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
    return React.useContext(ThemeContext)
}
