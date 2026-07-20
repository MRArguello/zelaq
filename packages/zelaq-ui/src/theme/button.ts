import { colors, opacity, radii, sizes, space, typography } from './tokens'

export type ButtonVariant = 'primary' | 'secondary'

export function getButtonTokens(variant: ButtonVariant, disabled: boolean) {
    if (variant === 'secondary') {
        return {
            container: {
                minHeight: sizes.touchMin,
                minWidth: sizes.touchMin,
                paddingHorizontal: space[4],
                paddingVertical: space[3],
                borderRadius: radii.md,
                backgroundColor: colors.secondaryBackground,
                borderColor: colors.secondaryBorder,
                borderWidth: 1,
                opacity: disabled ? opacity.disabled : 1,
            },
            label: {
                color: colors.secondaryText,
                ...typography.button,
            },
        }
    }

    return {
        container: {
            minHeight: sizes.touchMin,
            minWidth: sizes.touchMin,
            paddingHorizontal: space[4],
            paddingVertical: space[3],
            borderRadius: radii.md,
            backgroundColor: disabled ? colors.primaryDisabled : colors.primary,
            borderColor: 'transparent',
            borderWidth: 1,
            opacity: disabled ? opacity.disabled : 1,
        },
        label: {
            color: colors.textOnPrimary,
            ...typography.button,
        },
    }
}