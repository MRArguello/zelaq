import type { StyleProp, TextStyle } from 'react-native'
import type { TextVariant, TextTone, TextAlign } from './Text.theme'

export type TextProps = {
    children: React.ReactNode
    variant?: TextVariant
    tone?: TextTone
    align?: TextAlign
    style?: StyleProp<TextStyle>
    testID?: string
    /** Overrides the accessible name/announcement when the visible text alone isn't sufficient. */
    accessibilityLabel?: string
}
