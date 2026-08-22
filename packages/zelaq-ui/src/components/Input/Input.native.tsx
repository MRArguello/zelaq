import * as React from 'react'
import { Animated, TextInput, View } from 'react-native'
import type { InputProps } from './Input.types'
import { useTheme } from '../../theme'
import { getInputTokens } from './Input.theme'
import { useMotionEnabled } from '../../internal/useMotionEnabled'
import { Text } from '../Text'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export function Input({
    label,
    helperText,
    errorMessage,
    placeholder,
    value,
    defaultValue,
    onChangeText,
    disabled = false,
    readOnly = false,
    style,
    testID,
    animated = true,
}: InputProps) {
    const [focused, setFocused] = React.useState(false)
    const theme = useTheme()
    const hasError = Boolean(errorMessage)
    const tokens = getInputTokens({ focused, disabled, error: hasError }, theme)
    const helperOrError = errorMessage ?? helperText
    const motionEnabled = useMotionEnabled(animated)
    // Only the default<->focused transition animates — disabled/error already pick a fixed
    // color from getInputTokens and aren't interaction-driven the way focus is.
    const canAnimateBorder = motionEnabled && !disabled && !hasError
    // useState, not useRef — react-hooks/refs flags reading `.current` during render.
    const [focusAnim] = React.useState(() => new Animated.Value(focused ? 1 : 0))

    React.useEffect(() => {
        if (!canAnimateBorder) {
            focusAnim.setValue(focused ? 1 : 0)
            return
        }
        Animated.timing(focusAnim, {
            toValue: focused ? 1 : 0,
            duration: theme.motion.duration.normal,
            // Color isn't supported by the native driver — runs on the JS thread.
            useNativeDriver: false,
        }).start()
    }, [focused, canAnimateBorder, focusAnim, theme.motion.duration.normal])

    const borderColor = canAnimateBorder
        ? focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [theme.colors.secondaryBorder, theme.colors.borderFocused],
          })
        : tokens.container.borderColor

    return (
        <View testID={testID} style={[{ flexDirection: 'column', gap: tokens.gap }, style]}>
            {label ? <Text variant="bodySmall">{label}</Text> : null}
            <AnimatedTextInput
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                placeholderTextColor={tokens.placeholderColor}
                editable={!disabled}
                readOnly={readOnly}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                accessibilityLabel={label}
                accessibilityState={{ disabled }}
                accessibilityHint={helperOrError}
                style={[tokens.container, tokens.text, { borderColor }]}
            />
            {helperOrError ? (
                <Text variant="bodyXs" tone={hasError ? 'danger' : 'muted'}>
                    {helperOrError}
                </Text>
            ) : null}
        </View>
    )
}
