import * as React from 'react'
import { TextInput, View } from 'react-native'
import type { InputProps } from './Input.types'
import { useTheme } from '../../theme'
import { getInputTokens } from './Input.theme'
import { Text } from '../Text'

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
}: InputProps) {
    const [focused, setFocused] = React.useState(false)
    const theme = useTheme()
    const hasError = Boolean(errorMessage)
    const tokens = getInputTokens({ focused, disabled, error: hasError }, theme)
    const helperOrError = errorMessage ?? helperText

    return (
        <View testID={testID} style={[{ flexDirection: 'column', gap: tokens.gap }, style]}>
            {label ? <Text variant="bodySmall">{label}</Text> : null}
            <TextInput
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
                style={[tokens.container, tokens.text]}
            />
            {helperOrError ? (
                <Text variant="bodyXs" tone={hasError ? 'danger' : 'muted'}>
                    {helperOrError}
                </Text>
            ) : null}
        </View>
    )
}
