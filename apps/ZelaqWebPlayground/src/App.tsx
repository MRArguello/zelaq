import { useState } from 'react'
import { Button, Card, Dialog, Input, Stack, Text, useTheme, ZelaqProvider } from 'zelaq-ui'
import type { ThemeMode } from 'zelaq-ui'

// Follows the app's own mode toggle, not the OS/browser color-scheme preference — index.css used
// to drive this via prefers-color-scheme, which fought with this state whenever they disagreed.
function PlaygroundBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        padding: 24,
      }}
    >
      {children}
    </div>
  )
}

function App() {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [email, setEmail] = useState('')
  const [responsiveOpen, setResponsiveOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [themedOpen, setThemedOpen] = useState(false)

  return (
    <ZelaqProvider mode={mode}>
      <PlaygroundBackground>
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
              colors: { surface: '#eef2ff', surfaceRaised: '#eef2ff', border: '#6366f1' },
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
  
        <Stack gap="md" style={{ width: 280 }}>
          <Text variant="heading2">Zelaq UI</Text>
  
          <Input label="Name" placeholder="Ada Lovelace" />
  
          <Input
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            helperText="Use your work email."
          />
  
          <Input
            label="Invalid email"
            value="not-an-email"
            errorMessage="Enter a valid email address."
          />
  
          <Input label="Disabled field" value="Unavailable" disabled />
  
          {/* Theme override: confirms Input's border/focus/error colors re-resolve, not just Card's. */}
          <ZelaqProvider
            mode={mode}
            theme={{ colors: { borderFocused: '#6366f1', secondaryBorder: '#a5b4fc' } }}
          >
            <Input label="Custom theme override" placeholder="Focus me to see the border" />
          </ZelaqProvider>
        </Stack>
  
        <Stack gap="md" style={{ width: 280 }}>
          <Text variant="heading2">Zelaq UI</Text>
  
          <Button onPress={() => setResponsiveOpen(true)}>Open responsive dialog</Button>
          <Button onPress={() => setDialogOpen(true)}>Open centered dialog</Button>
          <Button onPress={() => setSheetOpen(true)}>Open bottom sheet</Button>
          <Button onPress={() => setThemedOpen(true)}>Open themed dialog</Button>
  
          <Dialog
            open={responsiveOpen}
            title="Responsive presentation"
            onClose={() => setResponsiveOpen(false)}
            presentation="responsive"
          >
            <Stack gap="md">
              <Text>This becomes a sheet on mobile and a dialog on desktop web — resize the window to see it switch.</Text>
              <Button onPress={() => setResponsiveOpen(false)}>Close</Button>
            </Stack>
          </Dialog>
  
          <Dialog
            open={dialogOpen}
            title="Edit profile"
            onClose={() => setDialogOpen(false)}
            presentation="dialog"
          >
            <Stack gap="md">
              <Input label="Name" placeholder="Ada Lovelace" />
              <Button onPress={() => setDialogOpen(false)}>Save</Button>
            </Stack>
          </Dialog>
  
          <Dialog
            open={sheetOpen}
            title="Filters"
            onClose={() => setSheetOpen(false)}
            presentation="sheet"
          >
            <Stack gap="md">
              <Text tone="muted">Choose how results are filtered.</Text>
              <Button onPress={() => setSheetOpen(false)}>Apply</Button>
            </Stack>
          </Dialog>
  
          {/* Theme override: confirms Dialog's surface/backdrop/close-button re-resolve, not just Card's/Input's. */}
          <ZelaqProvider
            mode={mode}
            theme={{
              colors: { surfaceRaised: '#eef2ff', backdrop: 'rgba(99, 102, 241, 0.4)' },
            }}
          >
            <Dialog
              open={themedOpen}
              title="Custom theme override"
              onClose={() => setThemedOpen(false)}
              presentation="dialog"
            >
              <Stack gap="md">
                <Text tone="muted">Surface and backdrop colors come from the overridden theme.</Text>
                <Button onPress={() => setThemedOpen(false)}>Close</Button>
              </Stack>
            </Dialog>
          </ZelaqProvider>
        </Stack>
      </PlaygroundBackground>
    </ZelaqProvider>
  )
}
export default App
