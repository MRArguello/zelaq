import { useState, type CSSProperties } from 'react'
import { Card, IconButton, Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { Theme, ThemeMode } from 'zelaq-ui'
import { AnimatedLogo } from './assets/AnimatedLogo'

function BackgroundImage({ theme }: { theme: Theme }) {
  const { colors } = theme;

  const BackgroundStyles: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: -1,
    background: colors.backdrop
  }

  const backgroundImageStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    opacity: 0.55
  }

  const backgroundOverlayStyles: CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(
      "90deg",
    ${colors.backdrop} 0%,
    ${colors.backdrop} 45%,
    ${colors.backdrop} 100%
    )`
  }

  return (<div style={BackgroundStyles} aria-hidden="true">
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="https://cdn.imgipsum.com/one/400/900/webp/landscapes/15"
      />

      <img
        src="https://cdn.imgipsum.com/one/1200/800/webp/landscapes/15"
        alt=""
        style={backgroundImageStyles}
      />
    </picture>

    <div style={backgroundOverlayStyles} />
  </div>)
}

function PlaygroundBackground({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        minWidth: '100vw',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'

      }}
    >
      <BackgroundImage theme={theme} />
      {children}
    </div>
  )
}

function Footer({ theme, setMode, mode }: { theme: Theme; setMode: React.Dispatch<React.SetStateAction<ThemeMode>>, mode: ThemeMode }) {
  const { space } = theme
  return (
    <Stack gap="xl" align="center" style={{ width: '100%', padding: space.sm }}>

      <Stack gap="sm" align='center' style={{ marginTop: 'auto' }}>
        <IconButton
          variant="secondary"
          onPress={() => setMode((current: ThemeMode) => (current === 'dark' ? 'light' : 'dark'))}
          accessibilityLabel='darkmodeSwitcher'
          accessibilityHint={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          icon={mode === 'dark' ? <span>☀️</span> : <span>🌙</span>}
        />
        <Text>v0.1.3 · @zelaq/ui</Text>
      </Stack>
    </Stack>)
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const theme = useTheme();
  const { space } = theme;

  return (
    <ZelaqProvider mode={mode}>
      <PlaygroundBackground theme={theme}>
        <Stack style={{ padding: space.xl }}>
          <AnimatedLogo height={70} />
          <Text variant="body">Universal interface system</Text>
        </Stack>
        <Card variant="elevated" style={{ margin: `0 auto`, minWidth: 400, minHeight: 400 }}>
          Content
        </Card>
        <Footer theme={theme} setMode={setMode} mode={mode} />
      </PlaygroundBackground>
    </ZelaqProvider>
  )
}
export default App
