import type { StyleProp, ViewStyle } from 'react-native'
import type { Theme } from '../../theme'

export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between'

export type StackProps = {
    children: React.ReactNode
    gap?: keyof Theme['space']
    align?: StackAlign
    justify?: StackJustify
    style?: StyleProp<ViewStyle>
    testID?: string
}
