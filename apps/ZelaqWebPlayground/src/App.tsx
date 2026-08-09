import { Button, UIProvider } from '@zelaq/ui'

function App() {
  return (
    <UIProvider theme={{ colors: { primary: '#7c3aed' } }}>
      <p>Zelaq UI - Web Playground</p>
      <Button onPress={() => console.log('web button pressed')}>
        Web button
      </Button>
    </UIProvider>
  )
}
export default App
