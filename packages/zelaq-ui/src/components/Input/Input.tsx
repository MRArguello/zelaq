import * as React from 'react'
import type { CSSProperties, ChangeEvent } from 'react'
import type { InputProps } from './Input.types'
import { useTheme } from '../../theme'
import { getInputTokens } from './Input.theme'
import { toRem } from '../../internal/toRem'
import { withFontFallback } from '../../internal/withFontFallback'
import { Text } from '../Text'

type WebInputProps = Omit<InputProps, 'style'> & {
    style?: CSSProperties
}

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
}: WebInputProps) {
    const [focused, setFocused] = React.useState(false)
    const theme = useTheme()
    const hasError = Boolean(errorMessage)
    const tokens = getInputTokens({ focused, disabled, error: hasError }, theme)
    const inputId = React.useId()
    const helperId = React.useId()
    const helperOrError = errorMessage ?? helperText

    const inputStyle: CSSProperties = {
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: tokens.container.backgroundColor,
        borderRadius: tokens.container.borderRadius,
        border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
        padding: `${toRem(tokens.container.paddingVertical)} ${toRem(tokens.container.paddingHorizontal)}`,
        opacity: tokens.container.opacity,
        color: tokens.text.color,
        fontFamily: withFontFallback(tokens.text.fontFamily),
        fontSize: toRem(tokens.text.fontSize),
        fontWeight: tokens.text.fontWeight,
        lineHeight: toRem(tokens.text.lineHeight),
        // Border color already signals focus; avoid a second, uncoordinated ring on top of it.
        outline: 'none',
    }

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: toRem(tokens.gap),
    }

    return (
        <div data-testid={testID} style={{ ...containerStyle, ...style }}>
            {label ? (
                <label htmlFor={inputId}>
                    <Text variant="bodySmall" as="span">
                        {label}
                    </Text>
                </label>
            ) : null}
            <input
                id={inputId}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                readOnly={readOnly}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeText?.(event.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-invalid={hasError || undefined}
                aria-describedby={helperOrError ? helperId : undefined}
                style={inputStyle}
            />
            {helperOrError ? (
                <div id={helperId}>
                    <Text variant="bodyXs" tone={hasError ? 'danger' : 'muted'}>
                        {helperOrError}
                    </Text>
                </div>
            ) : null}
        </div>
    )
}
