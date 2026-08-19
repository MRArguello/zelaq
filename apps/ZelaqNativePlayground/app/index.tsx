import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { Search, Settings, Trash2 } from 'lucide-react-native'
import { Button, IconButton } from 'zelaq-ui'

export default function App() {
    return (
        <SafeAreaView>
            <View style={{ padding: 24, gap: 16 }}>
                <Button onPress={() => console.log('native button pressed')}>
                    Native button
                </Button>
                <Button
                    startIcon={<Search size={16} color="#ffffff" />}
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
                        icon={<Settings size={20} color="#ffffff" />}
                        accessibilityLabel="Open settings"
                        onPress={() => console.log('settings pressed')}
                    />
                    <IconButton
                        variant="secondary"
                        icon={<Trash2 size={20} color="#111827" />}
                        accessibilityLabel="Delete file"
                        accessibilityHint="Permanently deletes the selected file"
                        onPress={() => console.log('delete pressed')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
