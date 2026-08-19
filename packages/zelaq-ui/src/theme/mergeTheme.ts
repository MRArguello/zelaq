import type { Theme, ThemeOverride } from './types'

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = { ...base }
    for (const key of Object.keys(override)) {
        const overrideValue = override[key]
        const baseValue = base[key]
        if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
            result[key] = deepMerge(baseValue, overrideValue)
        } else if (overrideValue !== undefined) {
            result[key] = overrideValue
        }
    }
    return result
}

/** Recursively merges a partial theme override over a base theme, at every nesting level (not just the top level). Never mutates either input. */
export function mergeTheme(base: Theme, override?: ThemeOverride): Theme {
    if (!override) return base
    return deepMerge(base as unknown as Record<string, unknown>, override as Record<string, unknown>) as unknown as Theme
}
