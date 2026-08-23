import { describe, expect, it } from 'vitest'
import { getButtonTokens } from './Button.theme'
import { lightTheme } from '../../theme/tokens'

describe('getButtonTokens', () => {
    it('primary: solid background, disabled swaps to the disabled color', () => {
        const enabled = getButtonTokens('primary', false, lightTheme)
        expect(enabled.container.backgroundColor).toBe(lightTheme.colors.primary)
        expect(enabled.container.opacity).toBe(1)

        const disabled = getButtonTokens('primary', true, lightTheme)
        expect(disabled.container.backgroundColor).toBe(lightTheme.colors.primaryDisabled)
        expect(disabled.container.opacity).toBe(lightTheme.opacity.disabled)
    })

    it('secondary: outlined, not filled', () => {
        const tokens = getButtonTokens('secondary', false, lightTheme)
        expect(tokens.container.backgroundColor).toBe(lightTheme.colors.secondaryBackground)
        expect(tokens.container.borderColor).toBe(lightTheme.colors.secondaryBorder)
        expect(tokens.label.color).toBe(lightTheme.colors.secondaryText)
    })

    it('link: transparent container, underlined label', () => {
        const tokens = getButtonTokens('link', false, lightTheme)
        expect(tokens.container.backgroundColor).toBe('transparent')
        expect(tokens.container.borderWidth).toBe(0)
        expect(tokens.label.textDecorationLine).toBe('underline')
        expect(tokens.label.color).toBe(lightTheme.colors.primary)
    })

    it('every variant keeps the same minimum tap target', () => {
        for (const variant of ['primary', 'secondary', 'link'] as const) {
            const tokens = getButtonTokens(variant, false, lightTheme)
            expect(tokens.container.minHeight).toBe(lightTheme.sizes.touchMin)
            expect(tokens.container.minWidth).toBe(lightTheme.sizes.touchMin)
        }
    })
})
