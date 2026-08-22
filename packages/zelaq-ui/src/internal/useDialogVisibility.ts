import * as React from 'react'

/**
 * Keeps a dialog/sheet mounted for `exitDurationMs` after `open` goes false, so an exit
 * animation has time to play instead of the content disappearing instantly. Pass 0 (motion
 * disabled) to unmount immediately, matching the pre-animation behavior exactly.
 *
 * Race-safe: reopening mid-exit re-runs the effect, clearing the pending unmount.
 */
export function useDialogVisibility(open: boolean, exitDurationMs: number): boolean {
    const [shouldRender, setShouldRender] = React.useState(open)

    React.useEffect(() => {
        if (open) {
            setShouldRender(true)
            return
        }
        if (exitDurationMs <= 0) {
            setShouldRender(false)
            return
        }
        const id = setTimeout(() => setShouldRender(false), exitDurationMs)
        return () => clearTimeout(id)
    }, [open, exitDurationMs])

    return shouldRender
}
