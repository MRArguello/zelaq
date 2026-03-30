/**
 * Theme utilities for creating and merging themes
 */

import type { Theme } from './types';
import { defaultTheme } from './tokens';

/**
 * Deep merge utility for objects
 */
function deepMerge<T extends Record<string, any>>(
    target: T,
    source: Partial<T>,
): T {
    const result = { ...target };

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = result[key];

            if (
                sourceValue !== null &&
                typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue) &&
                targetValue !== null &&
                typeof targetValue === 'object' &&
                !Array.isArray(targetValue)
            ) {
                result[key] = deepMerge(targetValue, sourceValue);
            } else {
                result[key] = sourceValue as T[Extract<keyof T, string>];
            }
        }
    }

    return result;
}

/**
 * Create a custom theme by merging with the default theme
 *
 * @param baseOverrides - Theme overrides to apply
 * @returns A new merged theme
 */
export function createTheme(baseOverrides?: Partial<Theme>): Theme {
    if (!baseOverrides) {
        return defaultTheme;
    }

    return deepMerge(defaultTheme, baseOverrides);
}

/**
 * Create a theme with a function that receives the default theme
 *
 * @param themeFn - Function that receives the default theme and returns overrides
 * @returns A new merged theme
 */
export function createThemeWithFunction(
    themeFn: (base: Theme) => Partial<Theme>,
): Theme {
    const overrides = themeFn(defaultTheme);
    return createTheme(overrides);
}
