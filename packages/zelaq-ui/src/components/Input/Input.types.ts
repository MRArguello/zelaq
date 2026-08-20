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
    style?: StyleProp<ViewStyle>
    testID?: string
}
