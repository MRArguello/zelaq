/** @type {import('jest').Config} */
module.exports = {
  preset: '@react-native/jest-preset',
  testMatch: ['<rootDir>/src/**/*.native.test.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.*/)?(react-native|@react-native|react-native-svg|lucide-react-native)/)',
  ],
};
