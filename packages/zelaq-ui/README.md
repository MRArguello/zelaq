# @zelaq/ui

Cross-platform component library for React and React Native.

## Installation

```bash
npm install @zelaq/ui
```

## Usage

### Basic Setup

```tsx
import { UIProvider } from '@zelaq/ui/provider';

function App() {
  return (
    <UIProvider>
      {/* Your app */}
    </UIProvider>
  );
}
```

### With Custom Theme

```tsx
import { UIProvider, createTheme } from '@zelaq/ui';

const customTheme = createTheme({
  colors: {
    primary: '#FF5733',
  },
});

function App() {
  return (
    <UIProvider theme={customTheme}>
      {/* Your app */}
    </UIProvider>
  );
}
```

### Using Theme in Components

```tsx
import { useTheme } from '@zelaq/ui/provider';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Hello!
    </div>
  );
}
```

## API

### UIProvider

Wraps your app to provide theme context.

### useTheme()

Hook to access the current theme object.

### createTheme(overrides)

Creates a new theme by merging overrides with the default theme.

## Structure

- `@zelaq/ui` - Main components export
- `@zelaq/ui/provider` - UIProvider and useTheme hook
- `@zelaq/ui/theme` - Theme utilities and types
