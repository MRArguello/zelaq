import * as React from 'react'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from './tokens'
import { mergeTheme } from './mergeTheme'
import type { Theme, ThemeOverride, ThemeMode } from './types'

const ThemeContext = React.createContext<Theme>(lightTheme)

export type ZelaqProviderProps = {
    theme?: ThemeOverride
    /** Default 'light'. */
    mode?: ThemeMode
    children?: React.ReactNode
}

export function ZelaqProvider({ theme, mode = 'light', children }: ZelaqProviderProps) {
    const systemScheme = useColorScheme()
    const resolvedScheme = mode === 'system' ? (systemScheme ?? 'light') : mode
    const baseTheme = resolvedScheme === 'dark' ? darkTheme : lightTheme

    const value = React.useMemo(() => mergeTheme(baseTheme, theme), [baseTheme, theme])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
    return React.useContext(ThemeContext)
}
