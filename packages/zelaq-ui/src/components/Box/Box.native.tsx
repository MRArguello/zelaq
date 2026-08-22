import * as React from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import type { BoxProps } from './Box.types'

type NativeBoxProps = BoxProps & Omit<ViewProps, 'style' | 'children' | 'testID'>

export function Box({ children, style, testID, ...rest }: NativeBoxProps) {
    return (
        <View testID={testID} style={style} {...rest}>
            {children}
        </View>
    )
}
