import * as React from 'react'
import type { CSSProperties } from 'react'
import type { TextProps } from './Text.types'
import { useTheme } from '../../theme'
import { getTextTokens } from './Text.theme'
import { withFontFallback } from '../../internal/withFontFallback'
import { toRem } from '../../internal/toRem'

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type WebTextProps = Omit<TextProps, 'style'> & {
    style?: CSSProperties
    /** Overrides the element rendered per variant (see defaultElementByVariant below). */
    as?: TextElement
}

const defaultElementByVariant: Record<NonNullable<TextProps['variant']>, TextElement> = {
    bodyXxs: 'span',
    bodyXs: 'p',
    bodySmall: 'p',
    body: 'p',
    subheading: 'h2',
    heading4: 'h4',
    heading3: 'h3',
    heading2: 'h2',
    heading1: 'h1',
    hero4: 'h1',
    hero3: 'h1',
    hero2: 'h1',
    hero1: 'h1',
}

export function Text({
    children,
    variant = 'body',
    tone = 'default',
    align = 'left',
    as,
    style,
    testID,
    accessibilityLabel,
}: WebTextProps) {
    const theme = useTheme()
    const tokens = getTextTokens(variant, tone, align, theme)
    const Element = as ?? defaultElementByVariant[variant]

    const textStyle: CSSProperties = {
        margin: 0,
        color: tokens.color,
        fontFamily: withFontFallback(tokens.fontFamily),
        fontSize: toRem(tokens.fontSize),
        fontWeight: tokens.fontWeight,
        lineHeight: toRem(tokens.lineHeight),
        textAlign: tokens.textAlign,
    }

    return (
        <Element data-testid={testID} style={{ ...textStyle, ...style }} aria-label={accessibilityLabel}>
            {children}
        </Element>
    )
}
