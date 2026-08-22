import { Box, Button, IconButton, Link, Stack, Text, type Theme, type ThemeMode, type ReduceMotionMode } from "zelaq-ui";
import { Sun, Moon, Zap, ZapOff, RotateCw } from 'lucide-react-native'

const ON_IMAGE_TEXT_COLOR = 'rgba(255, 255, 255, 0.92)'

function getReduceMotionIcon(reduceMotion: ReduceMotionMode) {
    if (reduceMotion === 'never') return <Zap />
    if (reduceMotion === 'always') return <ZapOff />
    return <RotateCw />
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

export default function Footer({
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
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: space.base }}>
                <IconButton
                    variant="secondary"
                    onPress={() => setMode((current: ThemeMode) => (current === 'dark' ? 'light' : 'dark'))}
                    accessibilityLabel='darkmodeSwitcher'
                    accessibilityHint={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                    icon={mode === 'dark' ? <Sun /> : <Moon />}
                />
                <Button
                    variant="secondary"
                    onPress={onToggleReduceMotion}
                    startIcon={getReduceMotionIcon(reduceMotion)}
                    accessibilityHint={`Animations are ${REDUCE_MOTION_STATE_LABEL[reduceMotion]} — press to change`}
                >
                    Animations: {REDUCE_MOTION_BUTTON_LABEL[reduceMotion]}
                </Button>
            </Box>
            <Text style={{ color: ON_IMAGE_TEXT_COLOR }}>
                v0.3.0 · <Link style={{ color: ON_IMAGE_TEXT_COLOR }} href="https://github.com/MRArguello/zelaq">@zelaq/ui</Link>
            </Text>
        </Stack>)
}