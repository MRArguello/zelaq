"use strict";

// import { Button as RNButton } from 'react-native';

// export const Button: React.FC<{ title: string; onPress: () => void; disabled?: boolean }> =
//     ({ title, onPress, disabled }) => {
//         return (
//             <RNButton title={title} onPress={onPress} disabled={disabled} />

//         );
//     }

import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { getButtonTokens, opacity } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function Button({
  children,
  variant = 'primary',
  disabled = false,
  onPress,
  style,
  textStyle,
  testID
}) {
  const tokens = getButtonTokens(variant, disabled);
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityRole: "button",
    disabled: disabled,
    onPress: onPress,
    testID: testID,
    style: ({
      pressed
    }) => [styles.base, tokens.container, pressed && !disabled ? styles.pressed : null, style],
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles.labelBase, tokens.label, textStyle],
      children: children
    })
  });
}
const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelBase: {},
  pressed: {
    opacity: opacity.pressed
  }
});
//# sourceMappingURL=Button.native.js.map