import type { StyleProp, ViewStyle } from 'react-native'
import type { DialogPresentation } from './Dialog.theme'

export type DialogProps = {
    open: boolean
    /** No accessible name is set if omitted — provide one via your own means in that case. */
    title?: string
    children: React.ReactNode
    onClose: () => void
    presentation?: DialogPresentation
    /** Default true. */
    closeOnBackdropPress?: boolean
    style?: StyleProp<ViewStyle>
    testID?: string
    /** False disables the enter/exit transition regardless of ZelaqProvider's reduceMotion. Default true. */
    animated?: boolean
}
