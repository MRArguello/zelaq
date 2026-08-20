import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'
import { Search, Settings, Trash2 } from 'lucide-react-native'
import { Button, Card, IconButton, Stack, Text, ZelaqProvider } from 'zelaq-ui'
import { useThemeModeToggle } from './_layout'

export default function App() {
    const { mode, toggleMode } = useThemeModeToggle()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
                <Button variant="secondary" onPress={toggleMode}>
                    Switch to {mode === 'dark' ? 'light' : 'dark'} mode
                </Button>
                <Button onPress={() => console.log('native button pressed')}>
                    Native button
                </Button>
                <Button
                    startIcon={<Search size={16} />}
                    onPress={() => console.log('search pressed')}
                >
                    Search
                </Button>
                <Button
                    variant="secondary"
                    accessibilityHint="Permanently deletes your account and all associated data"
                    onPress={() => console.log('delete account pressed')}
                >
                    Delete Account
                </Button>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <IconButton
                        icon={<Settings size={20} />}
                        accessibilityLabel="Open settings"
                        onPress={() => console.log('settings pressed')}
                    />
                    <IconButton
                        variant="secondary"
                        icon={<Trash2 size={20} />}
                        accessibilityLabel="Delete file"
                        accessibilityHint="Permanently deletes the selected file"
                        onPress={() => console.log('delete pressed')}
                    />
                </View>

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

                <Stack gap="sm" style={{ backgroundColor: '#f3f4f6', padding: 8 }}>
                    <Text variant="bodySmall">gap=&quot;sm&quot;</Text>
                </Stack>
                <Stack gap="xl" style={{ backgroundColor: '#f3f4f6', padding: 8 }}>
                    <Text variant="bodySmall">gap=&quot;xl&quot;</Text>
                </Stack>

                <Stack gap="md" align="center" style={{ backgroundColor: '#f3f4f6', padding: 8 }}>
                    <Text variant="bodySmall">Centered</Text>
                    <Button>Short</Button>
                </Stack>

                <Stack
                    gap="md"
                    justify="between"
                    style={{ height: 120, backgroundColor: '#f3f4f6', padding: 8 }}
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
            </ScrollView>
        </SafeAreaView>
    )
}
