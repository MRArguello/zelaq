import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { Stack, Text, useTheme } from 'zelaq-ui'
import type { ThemeMode } from 'zelaq-ui'
import { useThemeModeToggle } from './_layout'
import { useIsCompactLayout } from './hooks/useIsCompactLayout'

import Form from './Components/Form'
import PlaygroundBackground from './Components/Background'
import Footer from './Components/Footer';
import AnimatedLogo from './assets/AnimatedLogo'

const LOGO_COLOR: Record<ThemeMode, string> = {
    dark: '#115E59',
    light: '#54B8AE',
    system: '#54B8AE',
}

const ON_IMAGE_TEXT_COLOR = 'rgba(255, 255, 255, 0.92)'

export default function App() {
    const { mode, toggleMode, reduceMotion, toggleReduceMotion } = useThemeModeToggle()
    const theme = useTheme()
    const isCompact = useIsCompactLayout()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <PlaygroundBackground theme={theme}>
                    <Stack
                        align="center"
                        gap="xl"
                        style={{
                            width: '100%',
                            paddingVertical: theme.space.xl,
                            paddingHorizontal: isCompact ? 0 : theme.space.xl,
                        }}
                    >
                        <Stack align="center" gap="sm" style={{ paddingHorizontal: isCompact ? theme.space.xl : 0 }}>
                            <AnimatedLogo color={LOGO_COLOR[mode]} />
                            <Text variant="body" style={{ color: ON_IMAGE_TEXT_COLOR, textAlign: 'center' }}>
                                Crossplatform component library
                            </Text>
                        </Stack>
                        <Form />
                    </Stack>
                    <Footer
                        theme={theme}
                        setMode={toggleMode}
                        mode={mode}
                        reduceMotion={reduceMotion}
                        onToggleReduceMotion={toggleReduceMotion}
                    />
                </PlaygroundBackground>
            </ScrollView>
        </SafeAreaView>
    )
}
