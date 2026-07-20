"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typography = exports.space = exports.sizes = exports.radii = exports.opacity = exports.colors = void 0;
// /**
//  * Default theme tokens - light mode
//  */

// import type { Theme } from './types';

// export const defaultTheme: Theme = {
//     colors: {
//         primary: '#0066FF',
//         secondary: '#6B7280',
//         accent: '#F59E0B',
//         background: '#FFFFFF',
//         foreground: '#111827',
//         border: '#E5E7EB',
//         error: '#EF4444',
//         warning: '#F59E0B',
//         success: '#10B981',
//         info: '#3B82F6',
//     },
//     spacing: {
//         xs: 4,
//         sm: 8,
//         md: 16,
//         lg: 24,
//         xl: 32,
//         xxl: 48,
//     },
//     radii: {
//         sm: 4,
//         md: 8,
//         lg: 12,
//         full: 9999,
//     },
//     typography: {
//         fontSizeXs: 12,
//         fontSizeSm: 14,
//         fontSizeMd: 16,
//         fontSizeLg: 18,
//         fontSizeXl: 20,
//         fontWeight: {
//             regular: 400,
//             medium: 500,
//             semibold: 600,
//             bold: 700,
//         },
//         lineHeight: {
//             tight: 1.2,
//             normal: 1.5,
//             relaxed: 1.75,
//         },
//     },
// };

const colors = exports.colors = {
  primary: '#111827',
  primaryPressed: '#1f2937',
  primaryDisabled: '#9ca3af',
  secondaryBackground: '#ffffff',
  secondaryBorder: '#d1d5db',
  secondaryText: '#111827',
  textOnPrimary: '#ffffff'
};
const space = exports.space = {
  2: 8,
  3: 12,
  4: 16
};
const radii = exports.radii = {
  sm: 8,
  md: 10,
  pill: 999
};
const typography = exports.typography = {
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20
  }
};
const sizes = exports.sizes = {
  touchMin: 44
};
const opacity = exports.opacity = {
  disabled: 0.5,
  pressed: 0.85
};
//# sourceMappingURL=tokens.js.map