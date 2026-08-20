import { useState } from 'react'
import { Button, Card, Stack, Text, ZelaqProvider } from 'zelaq-ui'
import type { ThemeMode } from 'zelaq-ui'

function App() {
  const [mode, setMode] = useState<ThemeMode>('light')

  return (
    <ZelaqProvider mode={mode}>
      <img src="/zelaq-wordmark.png" alt="Zelaq" height={40} />
      <p>Web Playground</p>
      <Button
        variant="secondary"
        onPress={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
      >
        Switch to {mode === 'dark' ? 'light' : 'dark'} mode
      </Button>
      <Button onPress={() => console.log('web button pressed')}>
        Web button
      </Button>

      <Text variant="heading2">Section heading</Text>
      <Text variant="body">Regular body text</Text>
      <Text variant="bodySmall" tone="muted">Supporting text</Text>
      <Text variant="hero4" tone="danger" align="center">Validation message</Text>
      <Text variant="body" tone="success">Saved successfully</Text>

      <Stack gap="lg">
        <Text variant="heading2">Zelaq UI</Text>
        <Text tone="muted">A themeable cross-platform component library.</Text>
        <Button>Continue</Button>
      </Stack>

      <Stack gap="sm" style={{ background: '#f3f4f6', padding: 8 }}>
        <Text variant="bodySmall">gap=&quot;sm&quot;</Text>
      </Stack>
      <Stack gap="xl" style={{ background: '#f3f4f6', padding: 8 }}>
        <Text variant="bodySmall">gap=&quot;xl&quot;</Text>
      </Stack>

      <Stack gap="md" align="center" style={{ background: '#f3f4f6', padding: 8 }}>
        <Text variant="bodySmall">Centered</Text>
        <Button>Short</Button>
      </Stack>

      <Stack
        gap="md"
        justify="between"
        style={{ height: 120, background: '#f3f4f6', padding: 8 }}
      >
        <Text variant="bodySmall">Top</Text>
        <Text variant="bodySmall">Bottom</Text>
      </Stack>

      <Stack gap="lg">
        <Text variant="heading2">Zelaq UI</Text>

        <Card variant="subtle" style={{ width: 280 }}>
          <Stack gap="sm">
            <Text variant="heading4">Subtle</Text>
            <Text tone="muted">Everything is up to date.</Text>
          </Stack>
        </Card>

        <Card variant="outlined" style={{ width: 280 }}>
          <Stack gap="sm">
            <Text variant="heading4">Outlined</Text>
            <Text tone="muted">Everything is up to date.</Text>
          </Stack>
        </Card>

        <Card variant="elevated" style={{ width: 280 }}>
          <Stack gap="sm">
            <Text variant="heading4">Project status</Text>
            <Text tone="muted">Everything is up to date.</Text>
            <Button>View project</Button>
          </Stack>
        </Card>

        {/* Theme override: confirms Card surfaces/borders/shadow re-resolve, not just Button/Text. */}
        <ZelaqProvider
          mode={mode}
          theme={{
            colors: { secondaryBackground: '#eef2ff', secondaryBorder: '#6366f1' },
            shadow: { elevated: { color: 'rgba(99, 102, 241, 0.35)', blurRadius: 16 } },
          }}
        >
          <Stack gap="md">
            <Card variant="outlined" style={{ width: 280 }}>
              <Text tone="muted">Outlined, custom theme override</Text>
            </Card>
            <Card variant="elevated" style={{ width: 280 }}>
              <Text tone="muted">Elevated, custom theme override</Text>
            </Card>
          </Stack>
        </ZelaqProvider>
      </Stack>
    </ZelaqProvider>
  )
}
export default App
