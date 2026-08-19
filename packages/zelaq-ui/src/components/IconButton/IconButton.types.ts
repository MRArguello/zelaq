import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type { ButtonVariant } from '../../theme/button'

export type IconButtonProps = {
    /** The icon to render, e.g. a lucide-react / lucide-react-native icon element. Treated as decorative — the button's own accessible name comes from accessibilityLabel. */
    icon: React.ReactElement
    variant?: ButtonVariant
    disabled?: boolean
    /** Shows a spinner in place of the icon and marks the button busy. Implies disabled. */
    loading?: boolean
    /** Toggled/active visual state, e.g. for a pressed filter or toolbar toggle. */
    selected?: boolean
    onPress?: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    testID?: string
    /** Required — an icon-only button has no visible text, so this is its only accessible name. */
    accessibilityLabel: string
    /** Optional supplemental description for actions whose result isn't obvious from the label alone (e.g. destructive actions). */
    accessibilityHint?: string
}
