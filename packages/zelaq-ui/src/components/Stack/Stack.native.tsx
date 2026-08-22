import * as React from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import type { StackProps } from './Stack.types'
import { useTheme } from '../../theme'

type NativeStackProps = StackProps & Omit<ViewProps, 'style' | 'children' | 'testID'>

const alignItemsMap: Record<NonNullable<StackProps['align']>, 'flex-start' | 'center' | 'flex-end' | 'stretch'> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
}

const justifyContentMap: Record<
    NonNullable<StackProps['justify']>,
    'flex-start' | 'center' | 'flex-end' | 'space-between'
> = {
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
    ...rest
}: NativeStackProps) {
    const theme = useTheme()

    return (
        <View
            testID={testID}
            style={[
                {
                    flexDirection: 'column',
                    gap: theme.space[gap],
                    alignItems: alignItemsMap[align],
                    justifyContent: justifyContentMap[justify],
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    )
}
