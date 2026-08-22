import type { StyleProp, ViewStyle } from 'react-native'

export type InputProps = {
    label?: string
    helperText?: string
    errorMessage?: string
    placeholder?: string
    value?: string
    defaultValue?: string
    onChangeText?: (value: string) => void
    disabled?: boolean
    readOnly?: boolean
    /** Renders a growable multi-line field (textarea on web) instead of a single-line input. Default false. */
    multiline?: boolean
    style?: StyleProp<ViewStyle>
    testID?: string
    /** False disables the focus border-color transition regardless of ZelaqProvider's reduceMotion. Default true. */
    animated?: boolean
}
