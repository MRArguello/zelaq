import * as React from 'react'
import { Modal, Pressable, Text as RNText, View } from 'react-native'
import type { DialogProps } from './Dialog.types'
import { useTheme } from '../../theme'
import { getDialogTokens } from './Dialog.theme'
import { Text } from '../Text'

const DIALOG_MAX_WIDTH = 480

export function Dialog({
    open,
    title,
    children,
    onClose,
    presentation = 'responsive',
    closeOnBackdropPress = true,
    style,
    testID,
}: DialogProps) {
    const theme = useTheme()
    const tokens = getDialogTokens(theme)
    const isDialog = presentation === 'dialog'

    return (
        <Modal
            visible={open}
            transparent
            animationType={isDialog ? 'fade' : 'slide'}
            onRequestClose={onClose}
            testID={testID}
        >
            <Pressable
                accessible={false}
                onPress={closeOnBackdropPress ? onClose : undefined}
                style={{
                    flex: 1,
                    backgroundColor: tokens.backdropColor,
                    justifyContent: isDialog ? 'center' : 'flex-end',
                    alignItems: 'center',
                }}
            >
                {/* Absorbs taps so they don't bubble to the backdrop's dismiss handler above. */}
                <Pressable
                    accessible={false}
                    onPress={() => {}}
                    accessibilityViewIsModal
                    style={[
                        {
                            backgroundColor: tokens.surface.backgroundColor,
                            padding: tokens.surface.padding,
                            gap: tokens.surface.gap,
                            width: isDialog ? undefined : '100%',
                            maxWidth: isDialog ? DIALOG_MAX_WIDTH : undefined,
                            borderTopLeftRadius: tokens.radius,
                            borderTopRightRadius: tokens.radius,
                            borderBottomLeftRadius: isDialog ? tokens.radius : 0,
                            borderBottomRightRadius: isDialog ? tokens.radius : 0,
                            shadowColor: tokens.shadow.color,
                            shadowOffset: { width: tokens.shadow.offsetX, height: tokens.shadow.offsetY },
                            shadowOpacity: 1,
                            shadowRadius: tokens.shadow.blurRadius,
                            elevation: tokens.shadow.elevation,
                        },
                        style,
                    ]}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {title ? <Text variant="heading4">{title}</Text> : <View />}
                        <Pressable
                            onPress={onClose}
                            accessibilityRole="button"
                            accessibilityLabel="Close"
                            style={{
                                width: tokens.closeButton.container.width,
                                height: tokens.closeButton.container.height,
                                borderRadius: tokens.closeButton.container.borderRadius,
                                backgroundColor: tokens.closeButton.container.backgroundColor,
                                borderWidth: tokens.closeButton.container.borderWidth,
                                borderColor: tokens.closeButton.container.borderColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <RNText style={{ color: tokens.closeButton.iconColor, fontSize: 18, lineHeight: 18 }}>
                                ×
                            </RNText>
                        </Pressable>
                    </View>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    )
}
