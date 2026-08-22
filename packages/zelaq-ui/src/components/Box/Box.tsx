import * as React from 'react'
import type { CSSProperties } from 'react'
import type { BoxProps } from './Box.types'

type WebBoxProps = Omit<BoxProps, 'style'> & {
    style?: CSSProperties
}

export function Box({ children, style, testID }: WebBoxProps) {
    return (
        <div data-testid={testID} style={style}>
            {children}
        </div>
    )
}
