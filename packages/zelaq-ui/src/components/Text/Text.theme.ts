import { defaultTheme } from '../../theme/tokens'
import type { Theme } from '../../theme/types'

export type TextVariant =
    | 'bodyXxs'
    | 'bodyXs'
    | 'bodySmall'
    | 'body'
    | 'subheading'
    | 'heading4'
    | 'heading3'
    | 'heading2'
    | 'heading1'
    | 'hero4'
    | 'hero3'
    | 'hero2'
    | 'hero1'
export type TextTone = 'default' | 'muted' | 'inverse' | 'danger' | 'success'
export type TextAlign = 'left' | 'center' | 'right'

const toneColorKey: Record<TextTone, keyof Theme['colors']> = {
    default: 'textDefault',
    muted: 'textMuted',
    inverse: 'textInverse',
    danger: 'textDanger',
    success: 'textSuccess',
}

export function getTextTokens(
    variant: TextVariant,
    tone: TextTone,
    align: TextAlign,
    theme: Theme = defaultTheme,
) {
    const { colors, typography } = theme

    return {
        ...typography[variant],
        color: colors[toneColorKey[tone]],
        textAlign: align,
    }
}
