import * as React from 'react'
import type { CSSProperties, ChangeEvent } from 'react'
import type { InputProps } from './Input.types'
import { useTheme } from '../../theme'
import { getInputTokens } from './Input.theme'
import { toRem } from '../../internal/toRem'
import { withFontFallback } from '../../internal/withFontFallback'
import { useMotionEnabled } from '../../internal/useMotionEnabled'
import { Text } from '../Text'

// The textarea branch reuses this same attribute set — pattern/accept/min/max/etc. don't apply
// to a textarea, but spreading a typed variable (not an object literal) onto it isn't flagged by
// TS excess-property checks, and browsers ignore unrecognized attributes on either element.
type WebInputProps = Omit<InputProps, 'style'> &
    Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'defaultValue' | 'placeholder' | 'disabled' | 'readOnly' | 'onChange' | 'style' | 'id'
    > & {
        style?: CSSProperties
    }

// Roughly 4 lines at the body line-height — enough to signal "multi-line" without the field
// dominating the layout by default.
const TEXTAREA_MIN_HEIGHT = 96

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
    multiline = false,
    style,
    testID,
    animated = true,
    onBlur,
    onFocus,
    ...rest
}: WebInputProps) {
    const [focused, setFocused] = React.useState(false)
    const theme = useTheme()
    const hasError = Boolean(errorMessage)
    const tokens = getInputTokens({ focused, disabled, error: hasError }, theme)
    const inputId = React.useId()
    const helperId = React.useId()
    const helperOrError = errorMessage ?? helperText
    const motionEnabled = useMotionEnabled(animated)

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
        transition: motionEnabled ? `border-color ${theme.motion.duration.normal}ms ease` : undefined,
        ...(multiline ? { minHeight: TEXTAREA_MIN_HEIGHT, resize: 'vertical' as const } : null),
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
            {multiline ? (
                <textarea
                    {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    id={inputId}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChangeText?.(event.target.value)}
                    onFocus={(event) => {
                        setFocused(true)
                        onFocus?.(event as unknown as React.FocusEvent<HTMLInputElement>)
                    }}
                    onBlur={(event) => {
                        setFocused(false)
                        onBlur?.(event as unknown as React.FocusEvent<HTMLInputElement>)
                    }}
                    aria-invalid={hasError || undefined}
                    aria-describedby={helperOrError ? helperId : undefined}
                    style={inputStyle}
                />
            ) : (
                <input
                    {...rest}
                    id={inputId}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeText?.(event.target.value)}
                    onFocus={(event) => {
                        setFocused(true)
                        onFocus?.(event)
                    }}
                    onBlur={(event) => {
                        setFocused(false)
                        onBlur?.(event)
                    }}
                    aria-invalid={hasError || undefined}
                    aria-describedby={helperOrError ? helperId : undefined}
                    style={inputStyle}
                />
            )}
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
