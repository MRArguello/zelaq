import { useState } from 'react'
import { Button, Text, ZelaqProvider } from 'zelaq-ui'
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
    </ZelaqProvider>
  )
}
export default App
