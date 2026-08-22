import * as React from 'react'
import { ActivityIndicator, Animated, Pressable, StyleSheet } from 'react-native'
import type { PressableProps } from 'react-native'
import type { IconButtonProps } from './IconButton.types'
import { useTheme } from '../../theme'
import { getIconButtonTokens } from './IconButton.theme'
import { withDefaultIconColor } from '../../internal/withDefaultIconColor'
import { useMotionEnabled } from '../../internal/useMotionEnabled'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type NativeIconButtonProps = IconButtonProps &
    Omit<
        PressableProps,
        | 'onPress'
        | 'onPressIn'
        | 'onPressOut'
        | 'disabled'
        | 'style'
        | 'testID'
        | 'accessibilityRole'
        | 'accessibilityLabel'
        | 'accessibilityHint'
        | 'accessibilityState'
        | 'children'
    >

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
    animated = true,
    ...rest
}: NativeIconButtonProps) {
    const theme = useTheme()
    const isDisabled = disabled || loading
    const tokens = getIconButtonTokens(variant, isDisabled, selected, theme)
    const motionEnabled = useMotionEnabled(animated)
    // useState, not useRef — react-hooks/refs flags reading `.current` during render.
    const [scale] = React.useState(() => new Animated.Value(1))
    const [pressed, setPressed] = React.useState(false)

    const animateTo = (toValue: number) => {
        if (!motionEnabled) return
        Animated.timing(scale, {
            toValue,
            duration: theme.motion.duration.fast,
            useNativeDriver: true,
        }).start()
    }

    return (
        <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled: isDisabled, selected, busy: loading }}
            disabled={isDisabled}
            onPress={onPress}
            onPressIn={() => {
                setPressed(true)
                if (!isDisabled) animateTo(theme.motion.scale.pressed)
            }}
            onPressOut={() => {
                setPressed(false)
                animateTo(1)
            }}
            testID={testID}
            // A plain array, not a function — Animated's style extraction doesn't reliably
            // resolve Pressable's ({ pressed }) => [...] render-prop form.
            style={[
                styles.base,
                tokens.container,
                pressed && !isDisabled ? { opacity: theme.opacity.pressed } : null,
                { transform: [{ scale }] },
                style,
            ]}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator size="small" color={tokens.iconColor} />
            ) : (
                withDefaultIconColor(icon, tokens.iconColor)
            )}
        </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
