import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export type InputState = {
    focused: boolean
    disabled: boolean
    error: boolean
}

export function getInputTokens({ focused, disabled, error }: InputState, theme: Theme = defaultTheme) {
    const { colors, space, radii, typography } = theme

    // Disabled uses its own colors rather than dimming the normal ones via opacity — opacity
    // alone wasn't distinct enough from the default state (background/border/text all faded
    // together, keeping their relative contrast to each other roughly the same).
    const borderColor = disabled
        ? colors.border
        : error
          ? colors.textDanger
          : focused
            ? colors.borderFocused
            : colors.secondaryBorder

    return {
        container: {
            backgroundColor: disabled ? colors.fieldDisabledBackground : colors.fieldBackground,
            borderRadius: radii.xs,
            borderWidth: 1,
            borderColor,
            paddingHorizontal: space.base,
            paddingVertical: space['2md'],
            opacity: 1,
        },
        text: {
            color: disabled ? colors.fieldDisabledText : colors.textDefault,
            ...typography.body,
        },
        placeholderColor: colors.textMuted,
        gap: space.sm,
    }
}
