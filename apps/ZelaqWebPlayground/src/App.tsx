import { useState } from 'react'
import { Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { ReduceMotionMode, ThemeMode } from 'zelaq-ui'
import { AnimatedLogo } from './assets/AnimatedLogo'
import { Form } from './Components/Form'
import { PlaygroundBackground } from './Components/Background'
import { Footer } from './Components/Footer';
import { useIsMobile } from './hooks/useIsMobile'

const LOGO_COLOR: Record<ThemeMode, string> = {
  dark: '#115E59',
  light: '#54B8AE',
  system: '#54B8AE',
}

function AppContent({
  mode,
  setMode,
  reduceMotion,
  toggleReduceMotion,
}: {
  mode: ThemeMode
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>
  reduceMotion: ReduceMotionMode
  toggleReduceMotion: () => void
}) {
  const theme = useTheme()
  const { space } = theme
  const isMobile = useIsMobile()
  return (
    <PlaygroundBackground theme={theme}>
      <Stack
        align="center"
        justify="center"
        gap="xl"
        style={{
          flex: 1,
          width: '100%',
          padding: isMobile ? `${space.xl}px 0` : space.xl,
          boxSizing: 'border-box',
        }}
      >
        <Stack align="center" gap="sm" style={{ padding: isMobile ? `0 ${space.xl}px` : undefined }}>
          <AnimatedLogo height={70} color={LOGO_COLOR[mode]} />
          <Text variant="body" style={{ color: 'rgba(255, 255, 255, 0.92)', textAlign: 'center' }}>
            Crossplatform component library
          </Text>
        </Stack>
        <Form />
      </Stack>
      <Footer
        theme={theme}
        setMode={setMode}
        mode={mode}
        reduceMotion={reduceMotion}
        onToggleReduceMotion={toggleReduceMotion}
      />
    </PlaygroundBackground>
  )
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const [reduceMotion, setReduceMotion] = useState<ReduceMotionMode>('never')
  const toggleReduceMotion = () =>
    setReduceMotion((current) => (current === 'system' ? 'always' : current === 'always' ? 'never' : 'system'))
  return (
    <ZelaqProvider mode={mode} reduceMotion={reduceMotion}>
      <AppContent
        mode={mode}
        setMode={setMode}
        reduceMotion={reduceMotion}
        toggleReduceMotion={toggleReduceMotion}
      />
    </ZelaqProvider>
  )
}
export default App
