import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export type ButtonVariant = 'primary' | 'secondary' | 'link'

export function getButtonTokens(variant: ButtonVariant, disabled: boolean, theme: Theme = defaultTheme) {
    const { colors, space, radii, typography, sizes, opacity } = theme

    // Same touchMin/padding as the other variants — link still needs a real tap target.
    const baseContainer = {
        minHeight: sizes.touchMin,
        minWidth: sizes.touchMin,
        paddingHorizontal: space.base,
        paddingVertical: space['md'],
        gap: space.md,
        borderRadius: radii.xs,
        opacity: disabled ? opacity.disabled : 1,
    }

    if (variant === 'secondary') {
        return {
            container: {
                ...baseContainer,
                backgroundColor: colors.secondaryBackground,
                borderColor: colors.secondaryBorder,
                borderWidth: 1,
            },
            label: {
                color: colors.secondaryText,
                textDecorationLine: 'none' as const,
                ...typography.button,
            },
        }
    }

    if (variant === 'link') {
        return {
            container: {
                ...baseContainer,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
            },
            label: {
                color: colors.primary,
                textDecorationLine: 'underline' as const,
                ...typography.button,
            },
        }
    }

    return {
        container: {
            ...baseContainer,
            backgroundColor: disabled ? colors.primaryDisabled : colors.primary,
            borderColor: 'transparent',
            borderWidth: 1,
        },
        label: {
            color: colors.textOnPrimary,
            textDecorationLine: 'none' as const,
            ...typography.button,
        },
    }
}
