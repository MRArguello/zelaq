import * as React from 'react'
import { Text as RNText } from 'react-native'
import type { TextProps } from './Text.types'
import { useTheme } from '../../theme'
import { getTextTokens } from './Text.theme'

export function Text({
    children,
    variant = 'body',
    tone = 'default',
    align = 'left',
    style,
    testID,
    accessibilityLabel,
}: TextProps) {
    const theme = useTheme()
    const tokens = getTextTokens(variant, tone, align, theme)

    return (
        <RNText
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            style={[
                {
                    color: tokens.color,
                    // RN falls back to the platform font on its own if this isn't registered.
                    fontFamily: tokens.fontFamily,
                    fontSize: tokens.fontSize,
                    fontWeight: tokens.fontWeight,
                    lineHeight: tokens.lineHeight,
                    textAlign: tokens.textAlign,
                },
                style,
            ]}
        >
            {children}
        </RNText>
    )
}
