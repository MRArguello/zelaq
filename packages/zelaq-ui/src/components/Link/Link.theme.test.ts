import { describe, expect, it } from 'vitest'
import { getLinkTokens } from './Link.theme'
import { lightTheme, darkTheme } from '../../theme/tokens'

describe('getLinkTokens', () => {
    it('uses the primary brand color, tracking light/dark mode', () => {
        expect(getLinkTokens(lightTheme).color).toBe(lightTheme.colors.primary)
        expect(getLinkTokens(darkTheme).color).toBe(darkTheme.colors.primary)
    })

    it('matches body typography — a link is inline text, not its own scale', () => {
        const tokens = getLinkTokens(lightTheme)
        expect(tokens.fontSize).toBe(lightTheme.typography.body.fontSize)
        expect(tokens.fontWeight).toBe(lightTheme.typography.body.fontWeight)
        expect(tokens.lineHeight).toBe(lightTheme.typography.body.lineHeight)
    })
})
