import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ButtonVariant } from '../../theme'

export type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    testID?: string
    /** Overrides the accessible name. Required when children isn't a readable string (e.g. an icon). */
    accessibilityLabel?: string
    /** Supplemental description announced after the label, e.g. what the action does. */
    accessibilityHint?: string
    /** Set false to hide a purely decorative button from assistive tech. Defaults to true. */
    accessible?: boolean
}