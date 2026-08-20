<img src="./assets/wordmark.png" alt="Zelaq" width="240" />

# zelaq-ui

Cross-platform component library for React and React Native.

Component-level docs (props, usage, accessibility behavior) live in Storybook, not here — run
`pnpm dev:web` and see each component's Docs tab. This README covers what applies across the
whole library.

## Installation

```bash
npm install zelaq-ui
```

Peer dependencies: `react`, `react-native`. No `react-native-web` — each component has separate
web and native implementations, picked automatically at build time.

## Usage

```tsx
import { ZelaqProvider, Button, useTheme } from 'zelaq-ui';

function App() {
  return (
    <ZelaqProvider theme={{ colors: { primary: '#7c3aed' } }}>
      <Button variant="primary" onPress={() => {}}>
        Save
      </Button>
    </ZelaqProvider>
  );
}

function Custom() {
  const theme = useTheme();
  return <Text style={{ color: theme.colors.primary }}>Hi</Text>;
}
```

`theme` on `ZelaqProvider` is a partial override, deep-merged over the defaults at every nesting
level — overriding one nested field (e.g. just `typography.button.fontSize`) doesn't drop the
rest of that object.

`ZelaqProvider` also takes a `mode` prop — `'light' | 'dark' | 'system'`, defaults to `'light'`.
`'system'` follows the OS/browser color scheme and updates live if it changes (`matchMedia` on
web, `useColorScheme` on React Native).

## Icons

`zelaq-ui` doesn't bundle or depend on an icon library — icon props across components accept any
rendered React element, sized and colored by you. We build and test against
[Lucide](https://lucide.dev), installed separately in your own app:

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
(not a plain `npm install`) to get a build correctly linked for your app. How each component uses
icons is documented on that component's Storybook page.

## Typography

```ts
theme.typography.fontFamily.sans // 'Satoshi'
theme.typography.body            // { fontFamily, fontSize: 16, fontWeight: '400', lineHeight: 24 }
theme.typography.bodySmall       // { fontFamily, fontSize: 14, fontWeight: '400', lineHeight: 20 }
theme.typography.label           // { fontFamily, fontSize: 14, fontWeight: '500', lineHeight: 20 }
theme.typography.heading         // { fontFamily, fontSize: 24, fontWeight: '700', lineHeight: 32 }
theme.typography.button          // { fontFamily, fontSize: 16, fontWeight: '500', lineHeight: 20 }
```

One family (`Satoshi`) across the kit — `fontFamily` on each style, plus the raw name at
`typography.fontFamily.sans` for anything that needs just the family. Weights used: `400`
(Regular) for body, `500` (Medium) for labels/buttons, `700` (Bold) for headings — Satoshi has no
Semibold/`600` weight, so `500` stands in for it. Override `typography` via `ZelaqProvider`'s
`theme` prop to use a different font entirely.

### Font loading

[Satoshi](https://www.fontshare.com/fonts/satoshi) is provided by Fontshare / Indian Type
Foundry, under the [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl), which
permits embedding it in mobile and desktop applications for permitted uses. **The `zelaq-ui` npm
package does not include or redistribute Satoshi font files** — loading it is the consuming
app's responsibility. If it isn't loaded, components fall back to the platform default sans-serif
rather than failing.

- **Web**: the playground loads Satoshi via Fontshare's hosted web font CSS/API — see
  `apps/ZelaqWebPlayground/index.html`.
- **React Native**: obtain the font files directly from Fontshare and load them with
  `expo-font`'s `useFonts` (or the bare-RN equivalent) — see `apps/ZelaqNativePlayground/README.md`.
  Review the current license and confirm the exact filenames/weights against what you actually
  download before shipping. Static weight rendering can differ on Android — you may need to
  register a separate font family per weight rather than relying on `fontWeight` alone.

## API

- **`ZelaqProvider`** — provides theme context to its subtree. `theme` is a deep partial override;
  `mode` (`'light' | 'dark' | 'system'`, default `'light'`) picks the base palette.
- **`useTheme()`** — hook returning the theme in effect (base palette for the resolved mode,
  merged with any `ZelaqProvider` override).
