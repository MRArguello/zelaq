import * as React from 'react'

/** Native has no currentColor equivalent, so this fills in a theme default — only if the consumer hasn't already set a color. */
export function withDefaultIconColor(icon: React.ReactElement, defaultColor: string): React.ReactElement {
    const props = icon.props as { color?: unknown }
    if (props && props.color !== undefined) return icon
    return React.cloneElement(icon, { color: defaultColor } as object)
}
