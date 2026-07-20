import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ButtonVariant } from '../../theme';
export type ButtonProps = {
    children: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    testID?: string;
};
//# sourceMappingURL=Button.types.d.ts.map