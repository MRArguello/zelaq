"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var React = _interopRequireWildcard(require("react"));
var _theme = require("../../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Button({
  children,
  variant = 'primary',
  disabled = false,
  onPress,
  style,
  textStyle,
  testID
}) {
  const [pressed, setPressed] = React.useState(false);
  const tokens = (0, _theme.getButtonTokens)(variant, disabled);
  const containerStyle = {
    minHeight: tokens.container.minHeight,
    minWidth: tokens.container.minWidth,
    padding: `${tokens.container.paddingVertical}px ${tokens.container.paddingHorizontal}px`,
    borderRadius: tokens.container.borderRadius,
    background: tokens.container.backgroundColor,
    border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
    opacity: pressed && !disabled ? _theme.opacity.pressed : tokens.container.opacity,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const labelStyle = {
    color: tokens.label.color,
    fontSize: tokens.label.fontSize,
    fontWeight: tokens.label.fontWeight,
    lineHeight: `${tokens.label.lineHeight}px`
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    disabled: disabled,
    onClick: onPress,
    "data-testid": testID,
    style: {
      ...containerStyle,
      ...style
    },
    onMouseDown: () => !disabled && setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        ...labelStyle,
        ...textStyle
      },
      children: children
    })
  });
}
//# sourceMappingURL=Button.js.map