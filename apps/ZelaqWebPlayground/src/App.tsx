import { useState } from 'react'
import { Button, ZelaqProvider } from 'zelaq-ui'
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
    </ZelaqProvider>
  )
}
export default App
