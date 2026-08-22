import * as React from 'react'
import type { CSSProperties } from 'react'
import type { BoxProps } from './Box.types'

type WebBoxProps = Omit<BoxProps, 'style'> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> & {
        style?: CSSProperties
    }

export function Box({ children, style, testID, ...rest }: WebBoxProps) {
    return (
        <div data-testid={testID} style={style} {...rest}>
            {children}
        </div>
    )
}
