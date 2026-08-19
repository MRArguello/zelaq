import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ButtonVariant } from '../../theme/button'

export type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    testID?: string
    /** Decorative icon rendered before the label. Hidden from assistive tech automatically. */
    startIcon?: React.ReactElement
    /** Decorative icon rendered after the label. Hidden from assistive tech automatically. */
    endIcon?: React.ReactElement
    /** Overrides the accessible name. Required when children isn't a readable string (e.g. an icon). */
    accessibilityLabel?: string
    /** Optional supplemental description for actions whose result isn't obvious from the label alone (e.g. destructive actions). */
    accessibilityHint?: string
    /** Set false to hide a purely decorative button from assistive tech. Defaults to true. */
    accessible?: boolean
}