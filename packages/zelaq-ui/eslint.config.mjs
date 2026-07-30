import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactNativeA11y from 'eslint-plugin-react-native-a11y'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['lib']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs.flat.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser, ...globals.node },
        },
    },
    {
        // Web renderers: DOM accessibility rules (aria-*, semantic HTML).
        files: ['**/*.tsx'],
        ignores: ['**/*.native.tsx'],
        plugins: { 'jsx-a11y': jsxA11y },
        rules: jsxA11y.configs.recommended.rules,
    },
    {
        // Native renderers: RN accessibility props (accessibilityRole/Label/State, etc).
        files: ['**/*.native.tsx'],
        plugins: { 'react-native-a11y': reactNativeA11y },
        rules: {
            'react-native-a11y/has-accessibility-hint': 'off',
            'react-native-a11y/has-accessibility-props': 'error',
            'react-native-a11y/has-valid-accessibility-actions': 'error',
            'react-native-a11y/has-valid-accessibility-component-type': 'error',
            'react-native-a11y/has-valid-accessibility-descriptors': 'error',
            'react-native-a11y/has-valid-accessibility-role': 'error',
            'react-native-a11y/has-valid-accessibility-state': 'error',
            'react-native-a11y/has-valid-accessibility-states': 'error',
            'react-native-a11y/has-valid-accessibility-traits': 'error',
            'react-native-a11y/has-valid-accessibility-value': 'error',
            'react-native-a11y/no-nested-touchables': 'error',
        },
    },
])
