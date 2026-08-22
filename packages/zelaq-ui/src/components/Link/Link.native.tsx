import * as React from 'react'
import { Text, Linking } from 'react-native'
import type { LinkProps } from './Link.types'
import { useTheme } from '../../theme'
import { getLinkTokens } from './Link.theme'

export function Link({ href, children, onPress, style, testID, accessibilityLabel }: LinkProps) {
    const theme = useTheme()
    const tokens = getLinkTokens(theme)

    const handlePress = () => {
        onPress?.()
        Linking.openURL(href)
    }

    return (
        <Text
            onPress={handlePress}
            testID={testID}
            accessibilityRole="link"
            accessibilityLabel={accessibilityLabel}
            style={[
                {
                    color: tokens.color,
                    fontFamily: tokens.fontFamily,
                    fontSize: tokens.fontSize,
                    fontWeight: tokens.fontWeight,
                    lineHeight: tokens.lineHeight,
                    textDecorationLine: 'underline',
                },
                style,
            ]}
        >
            {children}
        </Text>
    )
}
