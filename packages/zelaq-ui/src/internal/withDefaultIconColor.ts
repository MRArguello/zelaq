import * as React from 'react'

/**
 * Native has no CSS currentColor equivalent, so icons don't automatically track theme changes
 * the way they do on web. This clones a consumer-provided icon element and injects the themed
 * default color — but only when the consumer hasn't already set one explicitly, so an intentional
 * custom color (e.g. a warning-colored icon) is never overridden.
 */
export function withDefaultIconColor(icon: React.ReactElement, defaultColor: string): React.ReactElement {
    const props = icon.props as { color?: unknown }
    if (props && props.color !== undefined) return icon
    return React.cloneElement(icon, { color: defaultColor } as object)
}
