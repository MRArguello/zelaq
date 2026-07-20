"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// import { Button as RNButton } from 'react-native';

// export const Button: React.FC<{ title: string; onPress: () => void; disabled?: boolean }> =
//     ({ title, onPress, disabled }) => {
//         return (
//             <RNButton title={title} onPress={onPress} disabled={disabled} />

//         );
//     }

function Button({
  children,
  variant = 'primary',
  disabled = false,
  onPress,
  style,
  textStyle,
  testID
}) {
  const tokens = (0, _theme.getButtonTokens)(variant, disabled);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityRole: "button",
    disabled: disabled,
    onPress: onPress,
    testID: testID,
    style: ({
      pressed
    }) => [styles.base, tokens.container, pressed && !disabled ? styles.pressed : null, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.labelBase, tokens.label, textStyle],
      children: children
    })
  });
}
const styles = _reactNative.StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelBase: {},
  pressed: {
    opacity: _theme.opacity.pressed
  }
});
//# sourceMappingURL=Button.native.js.map