import * as React from 'react'
import { View } from 'react-native'
import type { CardProps } from './Card.types'
import { useTheme } from '../../theme'
import { getCardTokens } from './Card.theme'

export function Card({ children, variant = 'subtle', style, testID }: CardProps) {
    const theme = useTheme()
    const tokens = getCardTokens(variant, theme)

    return (
        <View
            testID={testID}
            style={[
                tokens.container,
                tokens.shadow
                    ? {
                          shadowColor: tokens.shadow.color,
                          shadowOffset: { width: tokens.shadow.offsetX, height: tokens.shadow.offsetY },
                          shadowOpacity: 1,
                          shadowRadius: tokens.shadow.blurRadius,
                          elevation: tokens.shadow.elevation,
                      }
                    : null,
                style,
            ]}
        >
            {children}
        </View>
    )
}
