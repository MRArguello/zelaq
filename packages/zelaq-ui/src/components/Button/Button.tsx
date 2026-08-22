import * as React from 'react'
import type { CSSProperties } from 'react'
import type { ButtonProps } from './Button.types'
import { useTheme } from '../../theme'
import { getButtonTokens } from './Button.theme'
import { srOnlyStyle } from '../../internal/srOnlyStyle'
import { withFontFallback } from '../../internal/withFontFallback'
import { toRem } from '../../internal/toRem'
import { useMotionEnabled } from '../../internal/useMotionEnabled'

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
    animated = true,
}: WebButtonProps) {
    const [pressed, setPressed] = React.useState(false)
    const theme = useTheme()
    const tokens = getButtonTokens(variant, disabled, theme)
    const hintId = React.useId()
    const motionEnabled = useMotionEnabled(animated)
    const isPressed = pressed && !disabled

    const containerStyle: CSSProperties = {
        minHeight: tokens.container.minHeight,
        minWidth: tokens.container.minWidth,
        padding: `${toRem(tokens.container.paddingVertical)} ${toRem(tokens.container.paddingHorizontal)}`,
        borderRadius: tokens.container.borderRadius,
        background: tokens.container.backgroundColor,
        border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
        opacity: isPressed ? theme.opacity.pressed : tokens.container.opacity,
        transform: motionEnabled && isPressed ? `scale(${theme.motion.scale.pressed})` : undefined,
        transition: motionEnabled
            ? `opacity ${theme.motion.duration.fast}ms ease, transform ${theme.motion.duration.fast}ms ease`
            : undefined,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: startIcon || endIcon ? toRem(tokens.container.gap) : undefined,
        // currentColor for startIcon/endIcon — siblings of the label span, don't inherit its color otherwise.
        color: tokens.label.color,
    }

    const labelStyle: CSSProperties = {
        color: tokens.label.color,
        fontFamily: withFontFallback(tokens.label.fontFamily),
        fontSize: toRem(tokens.label.fontSize),
        fontWeight: tokens.label.fontWeight,
        lineHeight: toRem(tokens.label.lineHeight),
        textDecorationLine: tokens.label.textDecorationLine,
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
