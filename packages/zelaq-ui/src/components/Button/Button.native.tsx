import * as React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import type { ButtonProps } from './Button.types'
import { getButtonTokens, useTheme } from '../../theme'

export function Button({
    children,
    variant = 'primary',
    disabled = false,
    onPress,
    style,
    textStyle,
    testID,
}: ButtonProps) {
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)

    return (
        <Pressable
            accessibilityRole="button"
            disabled={disabled}
            onPress={onPress}
            testID={testID}
            style={({ pressed }) => [
                styles.base,
                tokens.container,
                pressed && !disabled ? { opacity: theme.opacity.pressed } : null,
                style,
            ]}
        >
            <Text style={[styles.labelBase, tokens.label, textStyle]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelBase: {},
})
