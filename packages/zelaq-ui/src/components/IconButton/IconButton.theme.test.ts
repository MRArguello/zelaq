import { describe, expect, it } from 'vitest'
import { getIconButtonTokens } from './IconButton.theme'
import { lightTheme } from '../../theme/tokens'

describe('getIconButtonTokens', () => {
    it('primary: disabled overrides selected for background color', () => {
        const disabledSelected = getIconButtonTokens('primary', true, true, lightTheme)
        expect(disabledSelected.container.backgroundColor).toBe(lightTheme.colors.primaryDisabled)
    })

    it('primary: selected uses the pressed color, unselected uses the base primary color', () => {
        const selected = getIconButtonTokens('primary', false, true, lightTheme)
        expect(selected.container.backgroundColor).toBe(lightTheme.colors.primaryPressed)

        const unselected = getIconButtonTokens('primary', false, false, lightTheme)
        expect(unselected.container.backgroundColor).toBe(lightTheme.colors.primary)
    })

    it('secondary: selected swaps both background and icon color for contrast', () => {
        const selected = getIconButtonTokens('secondary', false, true, lightTheme)
        expect(selected.container.backgroundColor).toBe(lightTheme.colors.primaryPressed)
        expect(selected.iconColor).toBe(lightTheme.colors.textOnPrimary)

        const unselected = getIconButtonTokens('secondary', false, false, lightTheme)
        expect(unselected.container.backgroundColor).toBe(lightTheme.colors.secondaryBackground)
        expect(unselected.iconColor).toBe(lightTheme.colors.secondaryText)
    })

    it('is always a square sized to the shared touch target', () => {
        const tokens = getIconButtonTokens('primary', false, false, lightTheme)
        expect(tokens.container.width).toBe(tokens.container.height)
        expect(tokens.container.width).toBe(lightTheme.sizes.touchMin)
    })
})
