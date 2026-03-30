"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  UIProvider: () => UIProvider,
  createTheme: () => createTheme,
  createThemeWithFunction: () => createThemeWithFunction,
  defaultTheme: () => defaultTheme,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(src_exports);

// src/components/Button/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Web Button" });
};

// src/provider/UIProvider.tsx
var import_react = require("react");

// src/styles/index.ts
var import_styled_components = require("styled-components");

// src/theme/tokens.ts
var defaultTheme = {
  colors: {
    primary: "#0066FF",
    secondary: "#6B7280",
    accent: "#F59E0B",
    background: "#FFFFFF",
    foreground: "#111827",
    border: "#E5E7EB",
    error: "#EF4444",
    warning: "#F59E0B",
    success: "#10B981",
    info: "#3B82F6"
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999
  },
  typography: {
    fontSizeXs: 12,
    fontSizeSm: 14,
    fontSizeMd: 16,
    fontSizeLg: 18,
    fontSizeXl: 20,
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  }
};

// src/theme/utils.ts
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (sourceValue !== null && typeof sourceValue === "object" && !Array.isArray(sourceValue) && targetValue !== null && typeof targetValue === "object" && !Array.isArray(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }
  return result;
}
function createTheme(baseOverrides) {
  if (!baseOverrides) {
    return defaultTheme;
  }
  return deepMerge(defaultTheme, baseOverrides);
}
function createThemeWithFunction(themeFn) {
  const overrides = themeFn(defaultTheme);
  return createTheme(overrides);
}

// src/provider/UIProvider.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)(null);
function resolveTheme(themeInput) {
  if (!themeInput) {
    return defaultTheme;
  }
  if (typeof themeInput === "function") {
    return createThemeWithFunction(themeInput);
  }
  if (typeof themeInput === "object") {
    return createTheme(themeInput);
  }
  return defaultTheme;
}
var UIProvider = ({
  theme: themeInput,
  mode: _mode = "light",
  children
}) => {
  const resolvedTheme = resolveTheme(themeInput);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_styled_components.ThemeProvider, { theme: resolvedTheme, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ThemeContext.Provider, { value: resolvedTheme, children }) });
};
function useTheme() {
  const theme = (0, import_react.useContext)(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a UIProvider");
  }
  return theme;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  UIProvider,
  createTheme,
  createThemeWithFunction,
  defaultTheme,
  useTheme
});
//# sourceMappingURL=index.js.map