// src/provider/UIProvider.tsx
import { createContext, useContext } from "react";

// src/styles/index.ts
import { styled, css, ThemeProvider, createGlobalStyle } from "styled-components";

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
import { jsx } from "react/jsx-runtime";
var ThemeContext = createContext(null);
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
  return /* @__PURE__ */ jsx(ThemeProvider, { theme: resolvedTheme, children: /* @__PURE__ */ jsx(ThemeContext.Provider, { value: resolvedTheme, children }) });
};
function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a UIProvider");
  }
  return theme;
}
export {
  UIProvider,
  useTheme
};
//# sourceMappingURL=provider.mjs.map