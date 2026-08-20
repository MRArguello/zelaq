import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type { ButtonVariant } from '../../theme/button'

export type IconButtonProps = {
    /** Always treated as decorative — the accessible name comes from accessibilityLabel. */
    icon: React.ReactElement
    variant?: ButtonVariant
    disabled?: boolean
    /** Implies disabled. */
    loading?: boolean
    selected?: boolean
    onPress?: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    testID?: string
    /** Required — icon-only, so this is the only accessible name. */
    accessibilityLabel: string
    /** Supplemental description for when the label alone doesn't convey the result (e.g. destructive actions). */
    accessibilityHint?: string
}
