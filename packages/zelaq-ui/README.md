<img src="./assets/wordmark.png" alt="Zelaq" width="240" />

# zelaq-ui

Cross-platform component library for React and React Native.

## Installation

```bash
npm install zelaq-ui
```

Peer dependencies: `react`, `react-native`. No `react-native-web` — each component has separate
web and native implementations, picked automatically at build time.

## Usage

```tsx
import { UIProvider, Button, useTheme } from 'zelaq-ui';

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

## Icons

`zelaq-ui` doesn't bundle or depend on an icon library — `Button`'s `startIcon`/`endIcon` and
`IconButton`'s `icon` accept any rendered React element, sized and colored by you. We build and
test against [Lucide](https://lucide.dev), installed separately in your own app:

```bash
# React (web)
npm install lucide-react

# React Native
npx expo install lucide-react-native react-native-svg
# or, without Expo:
npm install lucide-react-native react-native-svg
```

Use `lucide-react` in web code and `lucide-react-native` in React Native code — they're different
packages with the same icon set; don't cross-import one into the other. `react-native-svg` is a
native module `lucide-react-native` renders through, so it needs the Expo/RN install path above
(not a plain `npm install`) to get a build correctly linked for your app.

```tsx
// web
import { Search } from 'lucide-react';
<Button startIcon={<Search size={16} />}>Search</Button>

// React Native
import { Search } from 'lucide-react-native';
<Button startIcon={<Search size={16} color="#ffffff" />}>Search</Button>
```

Icons passed this way are automatically treated as decorative (hidden from assistive tech) —
`Button` already has an accessible name from its text label, so the icon shouldn't be announced
a second time.

### IconButton

An icon with no visible text label needs an explicit accessible name — `IconButton` makes
`accessibilityLabel` a required prop, not optional, so this can't be skipped by accident:

```tsx
import { Settings, Trash2 } from 'lucide-react';
import { IconButton } from 'zelaq-ui';

<IconButton icon={<Settings size={18} />} accessibilityLabel="Open settings" onPress={...} />

<IconButton
  icon={<Trash2 size={18} />}
  accessibilityLabel="Delete file"
  accessibilityHint="Permanently deletes the selected file"
  onPress={...}
/>
```

`accessibilityHint` is optional on both platforms, and available on both `Button` and
`IconButton` — supplemental context for when the result of an action isn't obvious from the label
alone. That's not limited to icon-only buttons: `accessibilityLabel="Delete Account"` on a regular
text `Button` is clear about *what* happens but not necessarily how consequential it is, so a hint
like `accessibilityHint="Permanently deletes your account and all associated data"` still adds
real information. Don't restate the label (`accessibilityLabel="Close"` +
`accessibilityHint="Closes"` tells a screen reader user nothing new) and don't use it as a
substitute for a real label. On React Native it forwards straight to `Pressable`'s own
`accessibilityHint`. On web there's no native hint concept, so it's rendered as a visually-hidden
element linked via `aria-describedby` — `aria-label`/the label text (the name) and the hint (the
description) stay two separate announcements, which is what `aria-describedby` is for.

`IconButton` also supports `variant` (`primary`/`secondary`, same as `Button`), `disabled`,
`loading` (shows a spinner, implies disabled, sets `aria-busy`/`accessibilityState.busy`), and
`selected` (toggled/active visual state, exposed as `aria-pressed`/`accessibilityState.selected`).

## API

- **`UIProvider`** — provides theme context to its subtree. `theme` prop is a partial override.
- **`useTheme()`** — hook returning the theme in effect (defaults + any `UIProvider` override).
