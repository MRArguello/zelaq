import { Button as RNButton } from 'react-native';

export const Button: React.FC<{ title: string; onPress: () => void; disabled?: boolean }> =
    ({ title, onPress, disabled }) => {
        return (
            <RNButton title={title} onPress={onPress} disabled={disabled} />

        );
    }