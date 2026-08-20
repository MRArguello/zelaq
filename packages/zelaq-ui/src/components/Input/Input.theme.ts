import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export type InputState = {
    focused: boolean
    disabled: boolean
    error: boolean
}

export function getInputTokens({ focused, disabled, error }: InputState, theme: Theme = defaultTheme) {
    const { colors, space, radii, typography, opacity } = theme

    const borderColor = error ? colors.textDanger : focused ? colors.primary : colors.secondaryBorder

    return {
        container: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor,
            paddingHorizontal: space.base,
            paddingVertical: space['2md'],
            opacity: disabled ? opacity.disabled : 1,
        },
        text: {
            color: colors.textDefault,
            ...typography.body,
        },
        placeholderColor: colors.textMuted,
        gap: space.sm,
    }
}
