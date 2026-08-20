import type { StyleProp, ViewStyle } from 'react-native'
import type { CardVariant } from './Card.theme'

export type CardProps = {
    children: React.ReactNode
    variant?: CardVariant
    style?: StyleProp<ViewStyle>
    testID?: string
}
