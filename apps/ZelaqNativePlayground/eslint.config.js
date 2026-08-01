// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const rootDir = __dirname;

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'eslint.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: rootDir,
      },
    },
  },
]);
