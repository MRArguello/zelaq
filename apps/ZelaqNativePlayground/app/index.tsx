import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { Search, Settings, Trash2 } from 'lucide-react-native'
import { Button, IconButton, Text } from 'zelaq-ui'
import { useThemeModeToggle } from './_layout'

export default function App() {
    const { mode, toggleMode } = useThemeModeToggle()

    return (
        <SafeAreaView>
            <View style={{ padding: 24, gap: 16 }}>
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
            </View>
        </SafeAreaView>
    )
}
