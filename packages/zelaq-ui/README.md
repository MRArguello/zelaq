<img src="./assets/wordmark.png" alt="Zelaq" width="240" />

# zelaq-ui

Cross-platform component library for React and React Native.

Component-level docs (props, usage, accessibility behavior) live in Storybook — see the
deployed version at [zelaq-ui.netlify.app](https://zelaq-ui.netlify.app), or run `pnpm dev:web`
on your local and see each component's Docs tab. This README covers what applies across the
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

The default color tokens (light and dark) are verified against WCAG contrast minimums (4.5:1
text, 3:1 UI boundaries). Overriding them via `theme` opts out of that guarantee — recheck
contrast for any color you replace.

## Customizing components

Two ways to customize the theme:

- **`ZelaqProvider`'s `theme` override** (see above) is for *systemic* changes — things meant to
  shift together, like a brand recolor or dark mode. It's token-scoped, not component-scoped:
  `colors.secondaryBorder`, for example, is shared by `Card`'s outlined variant, `Button`'s
  secondary variant, and `Input`'s default border — overriding it changes all of them at once,
  everywhere the override's subtree reaches. There's no way to target just one component type
  through the theme.
- **The `style` prop** every component accepts is for a *one-off* look on a single instance —
  `<Card style={{ borderColor: 'red' }}>` changes only that `Card`, nothing else.

If you want a one-off look reused in multiple places, wrap the component instead of repeating the
`style` prop:

```tsx
// your own file, outside zelaq-ui
import { Card, type CardProps } from 'zelaq-ui';

export function SpecialCard({ children, ...props }: CardProps) {
  return (
    <Card style={{ borderColor: 'red', borderWidth: 2 }} {...props}>
      {children}
    </Card>
  );
}
```

For a version that works on both platforms, remember `style` is typed as `CSSProperties` on web
and `StyleProp<ViewStyle>` on native — either give `SpecialCard` its own `.native.tsx` sibling (the
same pattern this library uses internally), or stick to properties valid in both shapes (plain
color strings, numbers).

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
packages with the same icon set. `react-native-svg` is a native module `lucide-react-native` renders through, so it needs the Expo/RN install path above (not a plain `npm install`) to get a build correctly linked for your app. How each component uses icons is documented on that component's Storybook page.

## Typography

```ts
theme.typography.body       // { fontFamily, fontSize: 16, fontWeight: '400', lineHeight: 24 }
theme.typography.heading1   // { fontFamily, fontSize: 40, fontWeight: '700', lineHeight: 50 }
theme.typography.fontFamily.sans // 'Satoshi'
```

One family (`Satoshi`) across the kit, weights `400`/`500`/`700` are used. Full variant list and exact values: `Text`'s Storybook page. Override `typography` via `ZelaqProvider`'s `theme` prop to use a different font.

`fontSize`/`lineHeight` are px-equivalent numbers; on web, `Text`/`Button` render them as `rem` so
they scale with browser/OS font-size settings (`allowFontScaling` gives native the same behavior).

### Font loading

[Satoshi](https://www.fontshare.com/fonts/satoshi) ([ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl))
isn't bundled by `zelaq-ui` — loading it is the consuming app's responsibility. Missing font falls
back to the platform default sans-serif.

- **Web**: load via Fontshare's hosted CSS — see `.storybook/preview-head.html` or
  `apps/ZelaqWebPlayground/index.html` for a working example.
- **React Native**: see `apps/ZelaqNativePlayground/README.md` for the full setup (font files,
  `expo-font`, Android weight caveats).

## API

- **`ZelaqProvider`** — theme context provider. See Usage above for `theme`/`mode`.
- **`useTheme()`** — hook returning the theme in effect.
