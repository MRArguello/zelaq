import * as React from 'react'
import { AccessibilityInfo, useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from './tokens'
import { mergeTheme } from './mergeTheme'
import type { Theme, ThemeOverride, ThemeMode, ReduceMotionMode } from './types'

const ThemeContext = React.createContext<Theme>(lightTheme)
// Separate context — it's a resolved boolean, not a design token ThemeOverride should model.
const MotionContext = React.createContext<boolean>(false)

function useSystemReduceMotion(enabled: boolean): boolean {
    const [reduced, setReduced] = React.useState(false)

    React.useEffect(() => {
        if (!enabled) return
        let mounted = true
        AccessibilityInfo.isReduceMotionEnabled().then((value) => {
            if (mounted) setReduced(value)
        })
        const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
        return () => {
            mounted = false
            subscription.remove()
        }
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
    const systemScheme = useColorScheme()
    const resolvedScheme = mode === 'system' ? (systemScheme ?? 'light') : mode
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
