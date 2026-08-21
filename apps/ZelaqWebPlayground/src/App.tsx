import { useState } from 'react'
import { Button, Card, Dialog, IconButton, Input, Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { Theme, ThemeMode } from 'zelaq-ui'
import { AnimatedLogo } from './assets/AnimatedLogo'

// Follows the app's own mode toggle, not the OS/browser color-scheme preference — index.css used
// to drive this via prefers-color-scheme, which fought with this state whenever they disagreed.
function PlaygroundBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        height: '100vh',
        width: '100%',
        minWidth: '100vw',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'

      }}
    >
      {children}
    </div>
  )
}

function Sidebar({ theme, setMode, mode }: { theme: Theme; setMode: React.Dispatch<React.SetStateAction<ThemeMode>>, mode: ThemeMode }) {
  return (
    <Stack gap="xl" align="center" style={{ width: 280, padding: theme.space.lg, boxShadow: `0 0 8px ${theme.colors.backdrop}` }}>
      <Stack>
        <AnimatedLogo height={70} />
        <Text variant="body">Universal interface system</Text>
      </Stack>
      <Text variant="heading2">UI Lab</Text>
      <Stack gap='sm'>
        <Text variant='heading4' style={{ marginTop: theme.space.lg }}>Foundations</Text>
        <a href="#colors" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Colors</Text></a>
        <a href="#typography" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Typography</Text></a>
        <a href="#spacing" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Spacing</Text></a>
        <a href="#themes" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Themes</Text></a>

        <Text variant='heading4' style={{ marginTop: theme.space.lg }}>Components</Text>
        <a href="#button" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Button</Text></a>
        <a href="#text" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Text</Text></a>
        <a href="#stack" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Stack</Text></a>
        <a href="#card" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Card</Text></a>
        <a href="#input" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Input</Text></a>
        <a href="#iconbutton" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>IconButton</Text></a>
        <a href="#dialog" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Dialog</Text></a>

        <Text variant='heading4' style={{ marginTop: theme.space.lg }}>Themes</Text>
        <a href="#project-setup" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Project setup</Text></a>
        <a href="#delete-confirmation" style={{ textDecoration: 'underline', color: theme.colors.primary }}><Text variant='body'>Delete confirmation</Text></a>
      </Stack>
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

function Content({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return <Stack style={{ padding: theme.space['3xl'], overflow: 'scroll', width: '100%' }}>{children}</Stack>
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const theme = useTheme();

  return (
    <ZelaqProvider mode={mode}>
      <PlaygroundBackground>
        <Sidebar theme={theme} setMode={setMode} mode={mode} />
        <Content theme={theme}>

          <div id="theme">
            <Text variant="heading2">THEMES</Text>
            <Text>
              A small, themeable interface system for React and React Native.
              Explore how one token system changes the same components across platforms.
            </Text>
          </div>
        </Content>
      </PlaygroundBackground>
    </ZelaqProvider>
  )
}
export default App
