"use strict";

import * as React from 'react';
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
  const [pressed, setPressed] = React.useState(false);
  const tokens = getButtonTokens(variant, disabled);
  const containerStyle = {
    minHeight: tokens.container.minHeight,
    minWidth: tokens.container.minWidth,
    padding: `${tokens.container.paddingVertical}px ${tokens.container.paddingHorizontal}px`,
    borderRadius: tokens.container.borderRadius,
    background: tokens.container.backgroundColor,
    border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
    opacity: pressed && !disabled ? opacity.pressed : tokens.container.opacity,
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
  return /*#__PURE__*/_jsx("button", {
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
    children: /*#__PURE__*/_jsx("span", {
      style: {
        ...labelStyle,
        ...textStyle
      },
      children: children
    })
  });
}
//# sourceMappingURL=Button.js.map