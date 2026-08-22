import { useState } from 'react'
import { Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { ThemeMode } from 'zelaq-ui'
import { AnimatedLogo } from './assets/AnimatedLogo'
import { Form } from './Components/Form'
import { PlaygroundBackground } from './Components/Background'
import { Footer } from './Components/Footer';


function App() {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const theme = useTheme()
  const { space } = theme
  return (
    <ZelaqProvider mode={mode}>
      <PlaygroundBackground theme={theme}>
        <Stack style={{ padding: space.xl }}>
          <AnimatedLogo height={70} />
          <Text variant="body">Universal interface system</Text>
        </Stack>
        <Form />
        <Footer theme={theme} setMode={setMode} mode={mode} />
      </PlaygroundBackground>
    </ZelaqProvider>
  )
}
export default App
