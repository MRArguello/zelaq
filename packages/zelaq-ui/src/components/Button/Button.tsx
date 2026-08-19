import * as React from 'react'
import type { CSSProperties } from 'react'
import type { ButtonProps } from './Button.types'
import { useTheme } from '../../theme'
import { getButtonTokens } from '../../theme/button'
import { srOnlyStyle } from '../../internal/srOnlyStyle'

type WebButtonProps = Omit<ButtonProps, 'style' | 'textStyle' | 'onPress'> & {
    onPress?: React.MouseEventHandler<HTMLButtonElement>
    style?: CSSProperties
    textStyle?: CSSProperties
}

function decorate(icon: React.ReactElement | undefined) {
    if (!icon) return null
    return React.cloneElement(icon, { 'aria-hidden': true, focusable: false } as React.SVGAttributes<SVGSVGElement>)
}

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
}: WebButtonProps) {
    const [pressed, setPressed] = React.useState(false)
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)
    const hintId = React.useId()

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
        gap: startIcon || endIcon ? theme.space[2] : undefined,
        // Sets currentColor for startIcon/endIcon, which are siblings of (not descendants of)
        // the label span below and so don't inherit its color on their own.
        color: tokens.label.color,
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
            aria-label={accessibilityLabel}
            aria-describedby={accessibilityHint ? hintId : undefined}
            aria-hidden={accessible ? undefined : true}
            tabIndex={accessible ? undefined : -1}
        >
            {decorate(startIcon)}
            <span style={{ ...labelStyle, ...textStyle }}>{children}</span>
            {decorate(endIcon)}
            {accessibilityHint ? (
                <span id={hintId} style={srOnlyStyle}>
                    {accessibilityHint}
                </span>
            ) : null}
        </button>
    )
}
