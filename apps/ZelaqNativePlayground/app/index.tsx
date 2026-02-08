import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, Switch, StyleSheet } from 'react-native';
import { UIProvider, useTheme } from '@zelaq/ui/provider';
import { SafeAreaView } from 'react-native-safe-area-context';
const KitchenSink: React.FC = () => {
    const theme: any = useTheme();
    const [text, setText] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [isDark, setIsDark] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, { color: theme?.colors?.text || '#000' }]}>Kitchen Sink</Text>

            <View style={styles.row}>
                <Text>Dark mode</Text>
                <Switch value={isDark} onValueChange={setIsDark} />
            </View>

            <View style={styles.row}>
                <Button title="Primary" onPress={() => { }} disabled={!enabled} />
                <Button title="Disabled" onPress={() => { }} disabled />
            </View>

            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type here" />

            <Text style={styles.section}>Theme preview</Text>
            <Text style={styles.code}>{JSON.stringify(theme, null, 2)}</Text>
        </ScrollView>
    );
};

export default function App() {
    return (
        // <UIProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <KitchenSink />
            </SafeAreaView>
        // </UIProvider>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginVertical: 8 },
    section: { marginTop: 12, fontWeight: '600' },
    code: { fontFamily: 'monospace', marginTop: 8 }
});
