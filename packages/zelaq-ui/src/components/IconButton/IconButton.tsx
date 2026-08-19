import * as React from 'react'
import type { CSSProperties } from 'react'
import type { IconButtonProps } from './IconButton.types'
import { useTheme } from '../../theme'
import { getIconButtonTokens } from '../../theme/iconButton'
import { srOnlyStyle } from '../../internal/srOnlyStyle'

type WebIconButtonProps = Omit<IconButtonProps, 'style' | 'onPress'> & {
    onPress?: React.MouseEventHandler<HTMLButtonElement>
    style?: CSSProperties
}

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
}: WebIconButtonProps) {
    const [pressed, setPressed] = React.useState(false)
    const theme = useTheme()
    const isDisabled = disabled || loading
    const tokens = getIconButtonTokens(variant, isDisabled, selected, theme)
    const hintId = React.useId()

    const containerStyle: CSSProperties = {
        width: tokens.container.width,
        height: tokens.container.height,
        padding: 0,
        borderRadius: tokens.container.borderRadius,
        background: tokens.container.backgroundColor,
        border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
        opacity: pressed && !isDisabled ? theme.opacity.pressed : tokens.container.opacity,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Sets currentColor so `icon` (a consumer-provided element, typically Lucide's default
        // stroke="currentColor") picks up the right color per variant without the consumer
        // needing to pass one explicitly.
        color: tokens.iconColor,
    }

    const decorativeIcon = React.cloneElement(icon, {
        'aria-hidden': true,
        focusable: false,
    } as React.SVGAttributes<SVGSVGElement>)

    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={onPress}
            data-testid={testID}
            style={{ ...containerStyle, ...style }}
            onMouseDown={() => !isDisabled && setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            aria-label={accessibilityLabel}
            aria-describedby={accessibilityHint ? hintId : undefined}
            aria-pressed={selected}
            aria-busy={loading || undefined}
        >
            {loading ? (
                <>
                    <style>{'@keyframes zelaq-icon-button-spin { to { transform: rotate(360deg) } }'}</style>
                    <span
                        aria-hidden="true"
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            border: `2px solid ${tokens.iconColor}`,
                            borderTopColor: 'transparent',
                            animation: 'zelaq-icon-button-spin 0.6s linear infinite',
                        }}
                    />
                </>
            ) : (
                decorativeIcon
            )}
            {accessibilityHint ? (
                <span id={hintId} style={srOnlyStyle}>
                    {accessibilityHint}
                </span>
            ) : null}
        </button>
    )
}
