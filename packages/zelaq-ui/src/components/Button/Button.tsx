import * as React from 'react'
import type { CSSProperties } from 'react'
import type { ButtonProps } from './Button.types'
import { getButtonTokens, useTheme } from '../../theme'

type WebButtonProps = Omit<ButtonProps, 'style' | 'textStyle' | 'onPress'> & {
    onPress?: React.MouseEventHandler<HTMLButtonElement>
    style?: CSSProperties
    textStyle?: CSSProperties
}

export function Button({
    children,
    variant = 'primary',
    disabled = false,
    onPress,
    style,
    textStyle,
    testID,
}: WebButtonProps) {
    const [pressed, setPressed] = React.useState(false)
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)

    const containerStyle: CSSProperties = {
        minHeight: tokens.container.minHeight,
        minWidth: tokens.container.minWidth,
        padding: `${tokens.container.paddingVertical}px ${tokens.container.paddingHorizontal}px`,
        borderRadius: tokens.container.borderRadius,
        background: tokens.container.backgroundColor,
        border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
        opacity: pressed && !disabled ? theme.opacity.pressed : tokens.container.opacity,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const labelStyle: CSSProperties = {
        color: tokens.label.color,
        fontSize: tokens.label.fontSize,
        fontWeight: tokens.label.fontWeight,
        lineHeight: `${tokens.label.lineHeight}px`,
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onPress}
            data-testid={testID}
            style={{ ...containerStyle, ...style }}
            onMouseDown={() => !disabled && setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
        >
            <span style={{ ...labelStyle, ...textStyle }}>{children}</span>
        </button>
    )
}