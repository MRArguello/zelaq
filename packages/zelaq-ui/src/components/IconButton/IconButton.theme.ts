import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

// Deliberately not Button's ButtonVariant — no icon-only equivalent of the 'link' variant, so
// it shouldn't silently accept it and fall through to primary styling.
export type IconButtonVariant = 'primary' | 'secondary'

export function getIconButtonTokens(
    variant: IconButtonVariant,
    disabled: boolean,
    selected: boolean,
    theme: Theme = defaultTheme,
) {
    const { colors, radii, sizes, opacity } = theme

    if (variant === 'secondary') {
        return {
            container: {
                width: sizes.touchMin,
                height: sizes.touchMin,
                borderRadius: radii.xs,
                backgroundColor: selected ? colors.primaryPressed : colors.secondaryBackground,
                borderColor: colors.secondaryBorder,
                borderWidth: 1,
                opacity: disabled ? opacity.disabled : 1,
            },
            iconColor: selected ? colors.textOnPrimary : colors.secondaryText,
        }
    }

    return {
        container: {
            width: sizes.touchMin,
            height: sizes.touchMin,
            borderRadius: radii.xs,
            backgroundColor: disabled ? colors.primaryDisabled : selected ? colors.primaryPressed : colors.primary,
            borderColor: 'transparent',
            borderWidth: 1,
            opacity: disabled ? opacity.disabled : 1,
        },
        iconColor: colors.textOnPrimary,
    }
}
