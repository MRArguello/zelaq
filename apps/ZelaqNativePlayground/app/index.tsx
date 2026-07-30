import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { Button } from '@zelaq/ui'

export default function App() {
    return (
        <SafeAreaView>
            <View style={{ padding: 24 }}>
                <Button onPress={() => console.log('native button pressed')}>
                    Native button
                </Button>
            </View>
        </SafeAreaView>
    )
}
