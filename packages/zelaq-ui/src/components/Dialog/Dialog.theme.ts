import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'
import { getIconButtonTokens } from '../IconButton/IconButton.theme'

export type DialogPresentation = 'responsive' | 'dialog' | 'sheet'

export function getDialogTokens(theme: Theme = defaultTheme) {
    const { colors, space, radii, shadow } = theme

    return {
        backdropColor: colors.backdrop,
        surface: {
            backgroundColor: colors.secondaryBackground,
            padding: space.base,
            gap: space.md,
        },
        radius: radii.md,
        shadow: shadow.elevated,
        closeButton: getIconButtonTokens('secondary', false, false, theme),
    }
}
