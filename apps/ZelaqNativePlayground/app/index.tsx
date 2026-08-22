import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { Stack, Text, useTheme } from 'zelaq-ui'
import { useThemeModeToggle } from './_layout'

import Form from './Components/Form'
import PlaygroundBackground from './Components/Background'
import Footer from './Components/Footer';
import AnimatedLogo from './assets/AnimatedLogo'


export default function App() {
    const { mode, toggleMode } = useThemeModeToggle()
    const theme = useTheme()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                <PlaygroundBackground theme={theme}>
                    <Stack style={{ padding: theme.space.xl }}>
                        <AnimatedLogo />
                        <Text variant="body">Universal interface system</Text>
                    </Stack>
                    <Form />
                    <Footer theme={theme} setMode={toggleMode} mode={mode} />
                </PlaygroundBackground>
            </ScrollView>
        </SafeAreaView>
    )
}
