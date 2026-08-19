import type { CSSProperties } from 'react'

/** Visually hides content while keeping it in the accessibility tree — used to render accessibilityHint text on web via aria-describedby. */
export const srOnlyStyle: CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
}
