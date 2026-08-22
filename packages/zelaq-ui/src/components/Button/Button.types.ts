import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ButtonVariant } from './Button.theme'

export type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    testID?: string
    /** Decorative — hidden from assistive tech automatically. */
    startIcon?: React.ReactElement
    /** Decorative — hidden from assistive tech automatically. */
    endIcon?: React.ReactElement
    /** Overrides the accessible name. Required when children isn't a readable string (e.g. an icon). */
    accessibilityLabel?: string
    /** Supplemental description for when the label alone doesn't convey the result (e.g. destructive actions). */
    accessibilityHint?: string
    /** False hides a purely decorative button from assistive tech. Default true. */
    accessible?: boolean
    /** False disables pressed-state motion regardless of ZelaqProvider's reduceMotion. Default true. */
    animated?: boolean
}