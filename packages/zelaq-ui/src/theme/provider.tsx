import * as React from 'react'
import { lightTheme, darkTheme } from './tokens'
import { mergeTheme } from './mergeTheme'
import type { Theme, ThemeOverride, ThemeMode } from './types'

const ThemeContext = React.createContext<Theme>(lightTheme)

function useSystemColorScheme(enabled: boolean): 'light' | 'dark' {
    const getScheme = () =>
        typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'

    const [scheme, setScheme] = React.useState<'light' | 'dark'>(getScheme)

    React.useEffect(() => {
        if (!enabled || typeof window === 'undefined' || !window.matchMedia) return
        const query = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = () => setScheme(query.matches ? 'dark' : 'light')
        listener()
        query.addEventListener('change', listener)
        return () => query.removeEventListener('change', listener)
    }, [enabled])

    return scheme
}

export type ZelaqProviderProps = {
    theme?: ThemeOverride
    /** Default 'light'. */
    mode?: ThemeMode
    children?: React.ReactNode
}

export function ZelaqProvider({ theme, mode = 'light', children }: ZelaqProviderProps) {
    const systemScheme = useSystemColorScheme(mode === 'system')
    const resolvedScheme = mode === 'system' ? systemScheme : mode
    const baseTheme = resolvedScheme === 'dark' ? darkTheme : lightTheme

    const value = React.useMemo(() => mergeTheme(baseTheme, theme), [baseTheme, theme])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
    return React.useContext(ThemeContext)
}
