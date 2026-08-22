import * as React from 'react'
import { Animated, Modal, Pressable, Text as RNText, View } from 'react-native'
import type { DialogProps } from './Dialog.types'
import { useTheme } from '../../theme'
import { getDialogTokens } from './Dialog.theme'
import { useMotionEnabled } from '../../internal/useMotionEnabled'
import { useDialogVisibility } from '../../internal/useDialogVisibility'
import { Text } from '../Text'

const DIALOG_MAX_WIDTH = 480
// Fixed rather than measured off the surface's actual height — RN transforms don't support
// percentages, and measuring via onLayout adds a frame of jank for a "subtle" motion that
// doesn't need a full off-screen slide to read as a sheet coming up.
const SHEET_ENTER_OFFSET = 40

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Dialog({
    open,
    title,
    children,
    onClose,
    presentation = 'responsive',
    closeOnBackdropPress = true,
    style,
    testID,
    animated = true,
}: DialogProps) {
    const theme = useTheme()
    const tokens = getDialogTokens(theme)
    const isDialog = presentation === 'dialog'
    const motionEnabled = useMotionEnabled(animated)
    const exitDuration = motionEnabled ? theme.motion.duration.normal : 0
    // Modal's `visible` stays true through the exit transition — matches the web lifecycle, and
    // is what actually lets the fade/scale-or-translateY below play instead of RN just hiding
    // the native modal instantly.
    const shouldRender = useDialogVisibility(open, exitDuration)
    // useState, not useRef — react-hooks/refs flags reading `.current` during render, and this
    // value only needs to be created once and stay stable, which a lazy useState initializer
    // gives us without being a ref.
    const [progress] = React.useState(() => new Animated.Value(open ? 1 : 0))

    React.useEffect(() => {
        if (!motionEnabled) {
            progress.setValue(open ? 1 : 0)
            return
        }
        Animated.timing(progress, {
            toValue: open ? 1 : 0,
            duration: theme.motion.duration.normal,
            useNativeDriver: true,
        }).start()
    }, [open, motionEnabled, progress, theme.motion.duration.normal])

    if (!shouldRender) return null

    const surfaceTransform = isDialog
        ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }]
        : [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [SHEET_ENTER_OFFSET, 0] }) }]

    return (
        <Modal visible={shouldRender} transparent animationType="none" onRequestClose={onClose} testID={testID}>
            <AnimatedPressable
                accessible={false}
                onPress={closeOnBackdropPress ? onClose : undefined}
                style={{
                    flex: 1,
                    backgroundColor: tokens.backdropColor,
                    justifyContent: isDialog ? 'center' : 'flex-end',
                    alignItems: 'center',
                    opacity: progress,
                }}
            >
                {/* Absorbs taps so they don't bubble to the backdrop's dismiss handler above. */}
                <Animated.View style={{ opacity: progress, transform: surfaceTransform }}>
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
                </Animated.View>
            </AnimatedPressable>
        </Modal>
    )
}
