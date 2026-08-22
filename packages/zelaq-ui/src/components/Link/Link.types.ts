import type { StyleProp, TextStyle } from 'react-native'

export type LinkProps = {
    href: string
    children: React.ReactNode
    /** Called in addition to the default navigation — doesn't prevent it, matching a real anchor's onClick. */
    onPress?: () => void
    style?: StyleProp<TextStyle>
    testID?: string
    /** Overrides the accessible name/announcement when the visible text alone isn't sufficient. */
    accessibilityLabel?: string
}
