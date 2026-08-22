import { IconButton, Stack, Text, type Theme, type ThemeMode } from "zelaq-ui";
import { Sun, Moon } from 'lucide-react-native'

export default function Footer({ theme, setMode, mode }: { theme: Theme; setMode: React.Dispatch<React.SetStateAction<ThemeMode>>, mode: ThemeMode }) {
    const { space } = theme
    return (
        <Stack gap="xl" align="center" style={{ width: '100%', padding: space.sm }}>
            <Stack gap="sm" align='center' style={{ marginTop: 'auto' }}>
                <IconButton
                    variant="secondary"
                    onPress={() => setMode((current: ThemeMode) => (current === 'dark' ? 'light' : 'dark'))}
                    accessibilityLabel='darkmodeSwitcher'
                    accessibilityHint={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
                    icon={mode === 'dark' ? <Sun /> : <Moon />}
                />
                <Text tone="inverse">v0.2.0 · @zelaq/ui</Text>
            </Stack>
        </Stack>)
}