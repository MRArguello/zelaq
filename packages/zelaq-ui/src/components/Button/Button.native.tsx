// import { Button as RNButton } from 'react-native';

// export const Button: React.FC<{ title: string; onPress: () => void; disabled?: boolean }> =
//     ({ title, onPress, disabled }) => {
//         return (
//             <RNButton title={title} onPress={onPress} disabled={disabled} />

//         );
//     }

import * as React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import type { ButtonProps } from './Button.types'
import { getButtonTokens, opacity } from '../../theme'

export function Button({
    children,
    variant = 'primary',
    disabled = false,
    onPress,
    style,
    textStyle,
    testID,
}: ButtonProps) {
    const tokens = getButtonTokens(variant, disabled)

    return (
        <Pressable
            accessibilityRole="button"
            disabled={disabled}
            onPress={onPress}
            testID={testID}
            style={({ pressed }) => [
                styles.base,
                tokens.container,
                pressed && !disabled ? styles.pressed : null,
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
    pressed: {
        opacity: opacity.pressed,
    },
})