import { describe, expect, it } from 'vitest'
import { getCardTokens } from './Card.theme'
import { lightTheme } from '../../theme/tokens'

describe('getCardTokens', () => {
    it('only elevated gets a shadow', () => {
        expect(getCardTokens('elevated', lightTheme).shadow).toBe(lightTheme.shadow.elevated)
        expect(getCardTokens('subtle', lightTheme).shadow).toBeNull()
        expect(getCardTokens('outlined', lightTheme).shadow).toBeNull()
    })

    it('only outlined gets a visible border color', () => {
        expect(getCardTokens('outlined', lightTheme).container.borderColor).toBe(lightTheme.colors.border)
        expect(getCardTokens('subtle', lightTheme).container.borderColor).toBe('transparent')
        expect(getCardTokens('elevated', lightTheme).container.borderColor).toBe('transparent')
    })

    it('elevated uses the raised surface color, others use the base surface', () => {
        expect(getCardTokens('elevated', lightTheme).container.backgroundColor).toBe(lightTheme.colors.surfaceRaised)
        expect(getCardTokens('subtle', lightTheme).container.backgroundColor).toBe(lightTheme.colors.surface)
        expect(getCardTokens('outlined', lightTheme).container.backgroundColor).toBe(lightTheme.colors.surface)
    })
})
