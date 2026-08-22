import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type { IconButtonVariant } from './IconButton.theme'

export type IconButtonProps = {
    /** Always treated as decorative — the accessible name comes from accessibilityLabel. */
    icon: React.ReactElement
    variant?: IconButtonVariant
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
    /** False disables pressed-state motion regardless of ZelaqProvider's reduceMotion. Default true. */
    animated?: boolean
}
