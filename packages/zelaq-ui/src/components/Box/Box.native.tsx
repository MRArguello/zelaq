import * as React from 'react'
import { View } from 'react-native'
import type { BoxProps } from './Box.types'

export function Box({ children, style, testID }: BoxProps) {
    return (
        <View testID={testID} style={style}>
            {children}
        </View>
    )
}
