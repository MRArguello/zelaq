"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonTokens = getButtonTokens;
var _tokens = require("./tokens");
function getButtonTokens(variant, disabled) {
  if (variant === 'secondary') {
    return {
      container: {
        minHeight: _tokens.sizes.touchMin,
        minWidth: _tokens.sizes.touchMin,
        paddingHorizontal: _tokens.space[4],
        paddingVertical: _tokens.space[3],
        borderRadius: _tokens.radii.md,
        backgroundColor: _tokens.colors.secondaryBackground,
        borderColor: _tokens.colors.secondaryBorder,
        borderWidth: 1,
        opacity: disabled ? _tokens.opacity.disabled : 1
      },
      label: {
        color: _tokens.colors.secondaryText,
        ..._tokens.typography.button
      }
    };
  }
  return {
    container: {
      minHeight: _tokens.sizes.touchMin,
      minWidth: _tokens.sizes.touchMin,
      paddingHorizontal: _tokens.space[4],
      paddingVertical: _tokens.space[3],
      borderRadius: _tokens.radii.md,
      backgroundColor: disabled ? _tokens.colors.primaryDisabled : _tokens.colors.primary,
      borderColor: 'transparent',
      borderWidth: 1,
      opacity: disabled ? _tokens.opacity.disabled : 1
    },
    label: {
      color: _tokens.colors.textOnPrimary,
      ..._tokens.typography.button
    }
  };
}
//# sourceMappingURL=button.js.map