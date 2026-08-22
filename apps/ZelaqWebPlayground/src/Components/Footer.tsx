import { Box, Button, IconButton, Link, Stack, Text, type Theme, type ThemeMode, type ReduceMotionMode } from "zelaq-ui";

const ON_IMAGE_TEXT_COLOR = 'rgba(255, 255, 255, 0.92)'

const REDUCE_MOTION_ICON: Record<ReduceMotionMode, string> = {
    never: '✨',
    always: '⛔',
    system: '🔁',
}

const REDUCE_MOTION_STATE_LABEL: Record<ReduceMotionMode, string> = {
    never: 'on',
    always: 'off',
    system: 'following system setting',
}

const REDUCE_MOTION_BUTTON_LABEL: Record<ReduceMotionMode, string> = {
    never: 'On',
    always: 'Off',
    system: 'Auto',
}

export function Footer({
    theme,
    setMode,
    mode,
    reduceMotion,
    onToggleReduceMotion,
}: {
    theme: Theme
    setMode: React.Dispatch<React.SetStateAction<ThemeMode>>
    mode: ThemeMode
    reduceMotion: ReduceMotionMode
    onToggleReduceMotion: () => void
}) {
    const { space } = theme
    return (
        <Stack gap="md" align="center" style={{ width: '100%', padding: space.base }}>
            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: space.base }}>
                <IconButton
                    variant="secondary"
                    onPress={() => setMode((current: ThemeMode) => (current === 'dark' ? 'light' : 'dark'))}
                    accessibilityLabel='darkmodeSwitcher'
                    accessibilityHint={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                    icon={mode === 'dark' ? <span>☀️</span> : <span>🌙</span>}
                />
                <Button
                    variant="secondary"
                    onPress={onToggleReduceMotion}
                    startIcon={<span>{REDUCE_MOTION_ICON[reduceMotion]}</span>}
                    accessibilityHint={`Animations are ${REDUCE_MOTION_STATE_LABEL[reduceMotion]} — press to change`}
                >
                    Animations: {REDUCE_MOTION_BUTTON_LABEL[reduceMotion]}
                </Button>
            </Box>
            <Text style={{ color: ON_IMAGE_TEXT_COLOR }}>v0.3.0 · <Link style={{ color: ON_IMAGE_TEXT_COLOR }} href="https://github.com/MRArguello/zelaq" target="_blank" rel="noopener noreferrer">@zelaq/ui</Link></Text>
        </Stack>)
}