import * as React from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import type { ButtonProps } from './Button.types'
import { useTheme } from '../../theme'
import { getButtonTokens } from './Button.theme'
import { withDefaultIconColor } from '../../internal/withDefaultIconColor'

export function Button({
    children,
    variant = 'primary',
    disabled = false,
    onPress,
    style,
    textStyle,
    testID,
    accessibilityLabel,
    accessibilityHint,
    accessible = true,
    startIcon,
    endIcon,
}: ButtonProps) {
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)

    return (
        <Pressable
            accessibilityRole="button"
            accessible={accessible}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled }}
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
            <View style={[styles.content, { gap: tokens.container.gap }]}>
                {startIcon ? withDefaultIconColor(startIcon, tokens.label.color) : null}
                <Text style={[styles.labelBase, tokens.label, textStyle]}>{children}</Text>
                {endIcon ? withDefaultIconColor(endIcon, tokens.label.color) : null}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelBase: {},
})
