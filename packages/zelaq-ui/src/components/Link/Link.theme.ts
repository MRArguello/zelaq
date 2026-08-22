import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export function getLinkTokens(theme: Theme = defaultTheme) {
    const { colors, typography } = theme

    return {
        color: colors.primary,
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
    }
}
