import * as React from 'react'
import { Animated, Modal, Pressable, ScrollView, Text as RNText, useWindowDimensions, View } from 'react-native'
import type { DialogProps } from './Dialog.types'
import { useTheme } from '../../theme'
import { getDialogTokens } from './Dialog.theme'
import { useMotionEnabled } from '../../internal/useMotionEnabled'
import { useDialogVisibility } from '../../internal/useDialogVisibility'
import { Text } from '../Text'

const DIALOG_MAX_WIDTH = 480
const DIALOG_MIN_WIDTH = 280
const DIALOG_MIN_HEIGHT = 180
// Total vertical margin the surface is capped against — RN has no vh/calc(), so this is
// subtracted from useWindowDimensions() instead. Without a cap, content taller than the screen
// had no way to be reached (no scroll region existed on the surface at all).
const DIALOG_VIEWPORT_MARGIN = 64
// Fixed, not measured off the surface — RN transforms don't support percentages, and onLayout
// measurement would add a frame of jank for what's meant to be a subtle offset.
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
    const { height: windowHeight } = useWindowDimensions()
    const motionEnabled = useMotionEnabled(animated)
    const exitDuration = motionEnabled ? theme.motion.duration.normal : 0
    // Stays true through the exit transition, so Modal's `visible` doesn't cut it instantly.
    const shouldRender = useDialogVisibility(open, exitDuration)
    // useState, not useRef — react-hooks/refs flags reading `.current` during render.
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
                {/* Absorbs taps so they don't bubble to the backdrop's dismiss handler above.
                    alignSelf: 'stretch' (sheet only) — otherwise this wrapper shrink-wraps, and
                    the Pressable's width: '100%' below has no definite width to resolve against. */}
                <Animated.View
                    style={{ alignSelf: isDialog ? undefined : 'stretch', opacity: progress, transform: surfaceTransform }}
                >
                    <Pressable
                        accessible={false}
                        onPress={() => {}}
                        accessibilityViewIsModal
                        style={[
                            {
                                backgroundColor: tokens.surface.backgroundColor,
                                width: isDialog ? undefined : '100%',
                                maxWidth: isDialog ? DIALOG_MAX_WIDTH : undefined,
                                minWidth: isDialog ? DIALOG_MIN_WIDTH : undefined,
                                minHeight: isDialog ? DIALOG_MIN_HEIGHT : undefined,
                                maxHeight: windowHeight - DIALOG_VIEWPORT_MARGIN,
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
                        {/* Padding/gap live here, not on the Pressable above, so they scroll with
                            the content instead of pinning outside the scrollable region. */}
                        <ScrollView contentContainerStyle={{ padding: tokens.surface.padding, gap: tokens.surface.gap }}>
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
                        </ScrollView>
                    </Pressable>
                </Animated.View>
            </AnimatedPressable>
        </Modal>
    )
}
