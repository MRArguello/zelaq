import * as React from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties } from 'react'
import type { DialogProps } from './Dialog.types'
import { useTheme } from '../../theme'
import { getDialogTokens } from './Dialog.theme'
import { toRem } from '../../internal/toRem'
import { withFontFallback } from '../../internal/withFontFallback'
import { useMotionEnabled } from '../../internal/useMotionEnabled'
import { useDialogVisibility } from '../../internal/useDialogVisibility'
import { Text } from '../Text'

type WebDialogProps = Omit<DialogProps, 'style'> & {
    style?: CSSProperties
}

const MOBILE_BREAKPOINT = 768
const DIALOG_MAX_WIDTH = 480
const DIALOG_MIN_WIDTH = 280
const DIALOG_MIN_HEIGHT = 180
// Total vertical viewport margin the surface is capped against — without this, content taller
// than the viewport has no way to be reached: body scroll is locked while open (below) and the
// surface itself had no scroll region.
const DIALOG_VIEWPORT_MARGIN = 64

export function Dialog({
    open,
    title,
    children,
    onClose,
    presentation = 'responsive',
    closeOnBackdropPress = true,
    style,
    testID,
    animated = true,
}: WebDialogProps) {
    const theme = useTheme()
    const tokens = getDialogTokens(theme)
    const titleId = React.useId()
    const responsiveClass = `zelaq-dialog-${React.useId().replace(/[^a-zA-Z0-9]/g, '')}`
    const surfaceRef = React.useRef<HTMLDivElement>(null)
    const motionEnabled = useMotionEnabled(animated)
    const exitDuration = motionEnabled ? theme.motion.duration.normal : 0
    // Stays true through the exit transition instead of unmounting the instant `open` goes
    // false — close/dismiss wiring below still keys off `open`, not this, so nothing fires twice.
    const shouldRender = useDialogVisibility(open, exitDuration)
    const [enteredState, setEnteredState] = React.useState(open)
    const entered = motionEnabled ? enteredState : open

    React.useEffect(() => {
        if (!motionEnabled) return
        if (open) {
            // Double rAF, not single — one frame can race the paint, landing the closed and open
            // styles together with nothing to visibly transition from.
            let innerId = 0
            const outerId = requestAnimationFrame(() => {
                innerId = requestAnimationFrame(() => setEnteredState(true))
            })
            return () => {
                cancelAnimationFrame(outerId)
                cancelAnimationFrame(innerId)
            }
        }
        setEnteredState(false)
    }, [open, motionEnabled])

    React.useEffect(() => {
        if (!open) return
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, onClose])

    React.useEffect(() => {
        if (!shouldRender) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [shouldRender])

    // Minimal focus handling: move focus into the dialog on open. Does not trap Tab within it
    // or restore focus to the trigger element on close — no focus-management utility exists in
    // this library yet, and a full trap/restore implementation is out of scope here.
    React.useEffect(() => {
        if (open) surfaceRef.current?.focus()
    }, [open])

    if (!shouldRender) return null

    const isSheet = presentation === 'sheet'
    const isResponsive = presentation === 'responsive'

    // For 'responsive', alignItems/borderRadius/width/maxWidth are left unset here entirely and
    // controlled by the injected media-query class below instead — inline styles always beat
    // class-based CSS regardless of specificity or @media, so setting both would make the class
    // inert at every viewport.
    const motionTransition = motionEnabled
        ? `opacity ${theme.motion.duration.normal}ms ease, transform ${theme.motion.duration.normal}ms ease`
        : undefined

    const backdropStyle: CSSProperties = {
        position: 'fixed',
        inset: 0,
        backgroundColor: tokens.backdropColor,
        display: 'flex',
        alignItems: isResponsive ? undefined : isSheet ? 'flex-end' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
        opacity: entered ? 1 : 0,
        transition: motionEnabled ? `opacity ${theme.motion.duration.normal}ms ease` : undefined,
    }

    // Same reasoning for 'responsive': opacity/transform driven by [data-entered] below instead,
    // since the entrance shape (translateY vs scale) switches at the same breakpoint as layout.
    const surfaceStyle: CSSProperties = {
        backgroundColor: tokens.surface.backgroundColor,
        padding: toRem(tokens.surface.padding),
        display: 'flex',
        flexDirection: 'column',
        gap: toRem(tokens.surface.gap),
        boxShadow: `${tokens.shadow.offsetX}px ${tokens.shadow.offsetY}px ${tokens.shadow.blurRadius}px ${tokens.shadow.color}`,
        borderRadius: isResponsive ? undefined : isSheet ? `${tokens.radius}px ${tokens.radius}px 0 0` : `${tokens.radius}px`,
        width: isResponsive ? undefined : isSheet ? '100%' : 'auto',
        maxWidth: isResponsive ? undefined : isSheet ? undefined : toRem(DIALOG_MAX_WIDTH),
        minWidth: isResponsive ? undefined : isSheet ? undefined : toRem(DIALOG_MIN_WIDTH),
        minHeight: isResponsive ? undefined : isSheet ? undefined : toRem(DIALOG_MIN_HEIGHT),
        maxHeight: `calc(100vh - ${DIALOG_VIEWPORT_MARGIN}px)`,
        overflowY: 'auto',
        boxSizing: 'border-box',
        opacity: isResponsive ? undefined : entered ? 1 : 0,
        transform: isResponsive ? undefined : entered ? 'none' : isSheet ? 'translateY(100%)' : 'scale(0.96)',
        transition: motionTransition,
    }

    return createPortal(
        <>
            {isResponsive ? (
                <style>{`
                    .${responsiveClass}-backdrop { align-items: flex-end; }
                    .${responsiveClass}-surface {
                        border-radius: ${tokens.radius}px ${tokens.radius}px 0 0;
                        width: 100%;
                        max-width: none;
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    .${responsiveClass}-surface[data-entered="true"] {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    @media (min-width: ${MOBILE_BREAKPOINT}px) {
                        .${responsiveClass}-backdrop { align-items: center; }
                        .${responsiveClass}-surface {
                            border-radius: ${tokens.radius}px;
                            width: auto;
                            max-width: ${toRem(DIALOG_MAX_WIDTH)};
                            min-width: ${toRem(DIALOG_MIN_WIDTH)};
                            min-height: ${toRem(DIALOG_MIN_HEIGHT)};
                            opacity: 0;
                            transform: scale(0.96);
                        }
                        .${responsiveClass}-surface[data-entered="true"] {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                `}</style>
            ) : null}
            <div
                data-testid={testID}
                role="presentation"
                className={isResponsive ? `${responsiveClass}-backdrop` : undefined}
                style={backdropStyle}
                onClick={(event) => {
                    if (closeOnBackdropPress && event.target === event.currentTarget) onClose()
                }}
            >
                <div
                    ref={surfaceRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? titleId : undefined}
                    tabIndex={-1}
                    className={isResponsive ? `${responsiveClass}-surface` : undefined}
                    data-entered={isResponsive ? (entered ? 'true' : 'false') : undefined}
                    style={{ ...surfaceStyle, ...style }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: toRem(theme.space.md),
                        }}
                    >
                        {title ? (
                            <div id={titleId}>
                                <Text variant="heading4">{title}</Text>
                            </div>
                        ) : (
                            <span />
                        )}
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={onClose}
                            style={{
                                width: tokens.closeButton.container.width,
                                height: tokens.closeButton.container.height,
                                padding: 0,
                                flexShrink: 0,
                                borderRadius: tokens.closeButton.container.borderRadius,
                                background: tokens.closeButton.container.backgroundColor,
                                border: `${tokens.closeButton.container.borderWidth}px solid ${tokens.closeButton.container.borderColor}`,
                                color: tokens.closeButton.iconColor,
                                fontFamily: withFontFallback(theme.typography.fontFamily.sans),
                                fontSize: toRem(18),
                                lineHeight: 1,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            ×
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>,
        document.body,
    )
}
