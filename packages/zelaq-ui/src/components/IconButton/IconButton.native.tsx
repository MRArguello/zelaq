import * as React from 'react'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import type { IconButtonProps } from './IconButton.types'
import { useTheme } from '../../theme'
import { getIconButtonTokens } from '../../theme/iconButton'

export function IconButton({
    icon,
    variant = 'primary',
    disabled = false,
    loading = false,
    selected = false,
    onPress,
    style,
    testID,
    accessibilityLabel,
    accessibilityHint,
}: IconButtonProps) {
    const theme = useTheme()
    const isDisabled = disabled || loading
    const tokens = getIconButtonTokens(variant, isDisabled, selected, theme)

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled: isDisabled, selected, busy: loading }}
            disabled={isDisabled}
            onPress={onPress}
            testID={testID}
            style={({ pressed }) => [
                styles.base,
                tokens.container,
                pressed && !isDisabled ? { opacity: theme.opacity.pressed } : null,
                style,
            ]}
        >
            {loading ? <ActivityIndicator size="small" color={tokens.iconColor} /> : icon}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
