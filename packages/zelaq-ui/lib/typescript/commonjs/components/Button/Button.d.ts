import * as React from 'react';
import type { CSSProperties } from 'react';
import type { ButtonProps } from './Button.types';
type WebButtonProps = Omit<ButtonProps, 'style' | 'textStyle' | 'onPress'> & {
    onPress?: React.MouseEventHandler<HTMLButtonElement>;
    style?: CSSProperties;
    textStyle?: CSSProperties;
};
export declare function Button({ children, variant, disabled, onPress, style, textStyle, testID, }: WebButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map