// React Native platform - re-export from styled-components/native
export { styled, css, ThemeProvider } from 'styled-components/native';
export type { DefaultTheme } from 'styled-components';

// Native doesn't have createGlobalStyle, so we provide a no-op
export const createGlobalStyle = () => null;
