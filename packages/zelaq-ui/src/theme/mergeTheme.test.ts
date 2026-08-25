import { describe, expect, it } from 'vitest'
import { mergeTheme } from './mergeTheme'
import { lightTheme } from './tokens'

describe('mergeTheme', () => {
    it('returns the base theme unchanged when no override is given', () => {
        expect(mergeTheme(lightTheme)).toBe(lightTheme)
    })

    it('overrides a top-level flat category', () => {
        const merged = mergeTheme(lightTheme, { colors: { primary: '#ff00ff' } })
        expect(merged.colors.primary).toBe('#ff00ff')
    })

    it('deep merges nested fields instead of replacing the whole sub-object', () => {
        const merged = mergeTheme(lightTheme, { typography: { button: { fontSize: 20 } } })
        expect(merged.typography.button.fontSize).toBe(20)
        expect(merged.typography.button.fontWeight).toBe(lightTheme.typography.button.fontWeight)
        expect(merged.typography.button.lineHeight).toBe(lightTheme.typography.button.lineHeight)
    })

    it('leaves unrelated categories untouched', () => {
        const merged = mergeTheme(lightTheme, { colors: { textDanger: '#ff00ff' } })
        expect(merged.colors.textSuccess).toBe(lightTheme.colors.textSuccess)
        expect(merged.space).toEqual(lightTheme.space)
    })

    it('adds consumer-defined custom tokens without touching built-in categories', () => {
        // "custom" isn't typed with real keys until a consumer augments ZelaqCustomTokens, so an
        // arbitrary key is exercised here via a cast rather than a legitimate override shape.
        const merged = mergeTheme(lightTheme, { custom: { brandAccent: '#ff00ff' } } as never)
        expect((merged.custom as Record<string, unknown>).brandAccent).toBe('#ff00ff')
        expect(merged.colors).toEqual(lightTheme.colors)
    })
})
