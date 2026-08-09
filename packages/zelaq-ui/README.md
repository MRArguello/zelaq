# @zelaq/ui

Cross-platform component library for React and React Native.

## Installation

```bash
npm install @zelaq/ui
```

Peer dependencies: `react`, `react-native`. No `react-native-web` — each component has separate
web and native implementations, picked automatically at build time.

## Usage

```tsx
import { UIProvider, Button, useTheme } from '@zelaq/ui';

function App() {
  return (
    <UIProvider theme={{ colors: { primary: '#7c3aed' } }}>
      <Button variant="primary" onPress={() => {}}>
        Save
      </Button>
    </UIProvider>
  );
}

function Custom() {
  const theme = useTheme(); 
  return <Text style={{ color: theme.colors.primary }}>Hi</Text>;
}
```

`theme` on `UIProvider` is a partial override merged over the defaults.

## API

- **`UIProvider`** — provides theme context to its subtree. `theme` prop is a partial override.
- **`useTheme()`** — hook returning the theme in effect (defaults + any `UIProvider` override).
