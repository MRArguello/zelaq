import * as React from 'react'
import { lightTheme, darkTheme } from './tokens'
import { mergeTheme } from './mergeTheme'
import type { Theme, ThemeOverride, ThemeMode, ReduceMotionMode } from './types'

const ThemeContext = React.createContext<Theme>(lightTheme)
// Separate from ThemeContext — reduced-motion is a resolved boolean, not a design token, and
// keeping it out of Theme means ThemeOverride never has to model it.
const MotionContext = React.createContext<boolean>(false)

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

function useSystemReduceMotion(enabled: boolean): boolean {
    const getPreference = () =>
        typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

    const [reduced, setReduced] = React.useState(getPreference)

    React.useEffect(() => {
        if (!enabled || typeof window === 'undefined' || !window.matchMedia) return
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const listener = () => setReduced(query.matches)
        listener()
        query.addEventListener('change', listener)
        return () => query.removeEventListener('change', listener)
    }, [enabled])

    return reduced
}

export type ZelaqProviderProps = {
    theme?: ThemeOverride
    /** Default 'light'. */
    mode?: ThemeMode
    /** Default 'system'. */
    reduceMotion?: ReduceMotionMode
    children?: React.ReactNode
}

export function ZelaqProvider({ theme, mode = 'light', reduceMotion = 'system', children }: ZelaqProviderProps) {
    const systemScheme = useSystemColorScheme(mode === 'system')
    const resolvedScheme = mode === 'system' ? systemScheme : mode
    const baseTheme = resolvedScheme === 'dark' ? darkTheme : lightTheme

    const systemReduceMotion = useSystemReduceMotion(reduceMotion === 'system')
    const resolvedReduceMotion =
        reduceMotion === 'always' ? true : reduceMotion === 'never' ? false : systemReduceMotion

    const value = React.useMemo(() => mergeTheme(baseTheme, theme), [baseTheme, theme])
    return (
        <ThemeContext.Provider value={value}>
            <MotionContext.Provider value={resolvedReduceMotion}>{children}</MotionContext.Provider>
        </ThemeContext.Provider>
    )
}

export function useTheme(): Theme {
    return React.useContext(ThemeContext)
}

/** True when motion should be suppressed — resolved from ZelaqProvider's `reduceMotion` prop. */
export function useReduceMotion(): boolean {
    return React.useContext(MotionContext)
}
