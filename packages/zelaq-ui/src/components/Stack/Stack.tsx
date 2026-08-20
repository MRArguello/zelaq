import * as React from 'react'
import type { CSSProperties } from 'react'
import type { StackProps } from './Stack.types'
import { useTheme } from '../../theme'
import { toRem } from '../../internal/toRem'

type WebStackProps = Omit<StackProps, 'style'> & {
    style?: CSSProperties
}

const alignItemsMap: Record<NonNullable<StackProps['align']>, CSSProperties['alignItems']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
}

const justifyContentMap: Record<NonNullable<StackProps['justify']>, CSSProperties['justifyContent']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
}

export function Stack({
    children,
    gap = 'base',
    align = 'stretch',
    justify = 'start',
    style,
    testID,
}: WebStackProps) {
    const theme = useTheme()

    const stackStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: toRem(theme.space[gap]),
        alignItems: alignItemsMap[align],
        justifyContent: justifyContentMap[justify],
    }

    return (
        <div data-testid={testID} style={{ ...stackStyle, ...style }}>
            {children}
        </div>
    )
}
