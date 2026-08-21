import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export type CardVariant = 'subtle' | 'outlined' | 'elevated'

export function getCardTokens(variant: CardVariant, theme: Theme = defaultTheme) {
    const { colors, space, radii, shadow } = theme

    return {
        container: {
            backgroundColor: variant === 'elevated' ? colors.surfaceRaised : colors.surface,
            borderRadius: radii.xs,
            borderWidth: 1,
            borderColor: variant === 'outlined' ? colors.border : 'transparent',
            padding: space.base,
        },
        shadow: variant === 'elevated' ? shadow.elevated : null,
    }
}
