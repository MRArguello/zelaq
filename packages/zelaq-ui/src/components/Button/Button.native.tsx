import * as React from 'react'
import { Animated, Pressable, Text, View, StyleSheet } from 'react-native'
import type { ButtonProps } from './Button.types'
import { useTheme } from '../../theme'
import { getButtonTokens } from './Button.theme'
import { withDefaultIconColor } from '../../internal/withDefaultIconColor'
import { useMotionEnabled } from '../../internal/useMotionEnabled'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

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
    animated = true,
}: ButtonProps) {
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)
    const motionEnabled = useMotionEnabled(animated)
    // useState, not useRef — react-hooks/refs flags reading `.current` during render.
    const [scale] = React.useState(() => new Animated.Value(1))

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
            accessible={accessible}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onPress}
            onPressIn={() => !disabled && animateTo(theme.motion.scale.pressed)}
            onPressOut={() => animateTo(1)}
            testID={testID}
            style={({ pressed }) => [
                styles.base,
                tokens.container,
                pressed && !disabled ? { opacity: theme.opacity.pressed } : null,
                { transform: [{ scale }] },
                style,
            ]}
        >
            <View style={[styles.content, { gap: tokens.container.gap }]}>
                {startIcon ? withDefaultIconColor(startIcon, tokens.label.color) : null}
                <Text style={[styles.labelBase, tokens.label, textStyle]}>{children}</Text>
                {endIcon ? withDefaultIconColor(endIcon, tokens.label.color) : null}
            </View>
        </AnimatedPressable>
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
