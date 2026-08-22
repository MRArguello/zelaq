import { useState } from 'react'
import { Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { ThemeMode } from 'zelaq-ui'
import { AnimatedLogo } from './assets/AnimatedLogo'
import { Form } from './Components/Form'
import { PlaygroundBackground } from './Components/Background'
import { Footer } from './Components/Footer';


function AppContent({ mode, setMode }: { mode: ThemeMode; setMode: React.Dispatch<React.SetStateAction<ThemeMode>> }) {
  const theme = useTheme()
  const { space } = theme
  return (
    <PlaygroundBackground theme={theme}>
      <Stack style={{ padding: space.xl }}>
        <AnimatedLogo height={70} />
        <Text variant="body">Universal interface system</Text>
      </Stack>
      <Form />
      <Footer theme={theme} setMode={setMode} mode={mode} />
    </PlaygroundBackground>
  )
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark')
  return (
    <ZelaqProvider mode={mode}>
      <AppContent mode={mode} setMode={setMode} />
    </ZelaqProvider>
  )
}
export default App
