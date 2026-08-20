import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'
import type { ButtonVariant } from '../Button/Button.theme'

export function getIconButtonTokens(
    variant: ButtonVariant,
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
                borderRadius: radii.md,
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
            borderRadius: radii.md,
            backgroundColor: disabled ? colors.primaryDisabled : selected ? colors.primaryPressed : colors.primary,
            borderColor: 'transparent',
            borderWidth: 1,
            opacity: disabled ? opacity.disabled : 1,
        },
        iconColor: colors.textOnPrimary,
    }
}
