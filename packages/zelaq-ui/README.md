<img src="./assets/wordmark.png" alt="Zelaq" width="240" />

# zelaq-ui

Cross-platform component library for React and React Native.

Component-level docs (props, usage, accessibility behavior) live in Storybook, not here — see the
deployed version at [zelaq-ui.netlify.app](https://zelaq-ui.netlify.app), or run `pnpm dev:web`
for the local copy and see each component's Docs tab. This README covers what applies across the
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

Two separate mechanisms, for two different needs — don't reach for the wrong one:

- **`ZelaqProvider`'s `theme` override** (see above) is for *systemic* changes — things meant to
  shift together, like a brand recolor or dark mode. It's token-scoped, not component-scoped:
  `colors.secondaryBorder`, for example, is shared by `Card`'s outlined variant, `Button`'s
  secondary variant, and `Input`'s default border — overriding it changes all of them at once,
  everywhere the override's subtree reaches. There's no way to target just one component type
  through the theme.
- **The `style` prop** every component accepts is for a *one-off* look on a single instance —
  `<Card style={{ borderColor: 'red' }}>` changes only that `Card`, nothing else.

If you want a one-off look reused in multiple places, wrap the component instead of repeating the
`style` prop — this is the intended pattern, not a workaround:

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
packages with the same icon set; don't cross-import one into the other. `react-native-svg` is a
native module `lucide-react-native` renders through, so it needs the Expo/RN install path above
(not a plain `npm install`) to get a build correctly linked for your app. How each component uses
icons is documented on that component's Storybook page.

## Typography

```ts
theme.typography.fontFamily.sans // 'Satoshi'
theme.typography.bodyXxs         // { fontFamily, fontSize: 10, fontWeight: '400', lineHeight: 16 }
theme.typography.bodyXs          // { fontFamily, fontSize: 12, fontWeight: '400', lineHeight: 18 }
theme.typography.bodySmall       // { fontFamily, fontSize: 14, fontWeight: '400', lineHeight: 20 }
theme.typography.body            // { fontFamily, fontSize: 16, fontWeight: '400', lineHeight: 24 }
theme.typography.subheading      // { fontFamily, fontSize: 24, fontWeight: '700', lineHeight: 32 }
theme.typography.heading4        // { fontFamily, fontSize: 20, fontWeight: '700', lineHeight: 25 }
theme.typography.heading3        // { fontFamily, fontSize: 24, fontWeight: '700', lineHeight: 30 }
theme.typography.heading2        // { fontFamily, fontSize: 32, fontWeight: '700', lineHeight: 40 }
theme.typography.heading1        // { fontFamily, fontSize: 40, fontWeight: '700', lineHeight: 50 }
theme.typography.hero4           // { fontFamily, fontSize: 64, fontWeight: '700', lineHeight: 70 }
theme.typography.hero3           // { fontFamily, fontSize: 76, fontWeight: '700', lineHeight: 83 }
theme.typography.hero2           // { fontFamily, fontSize: 96, fontWeight: '700', lineHeight: 105 }
theme.typography.hero1           // { fontFamily, fontSize: 120, fontWeight: '700', lineHeight: 132 }
theme.typography.button          // { fontFamily, fontSize: 16, fontWeight: '500', lineHeight: 20 }
```

One family (`Satoshi`) across the kit — `fontFamily` on each style, plus the raw name at
`typography.fontFamily.sans` for anything that needs just the family. Weights used: `400`
(Regular) for body variants, `700` (Bold) for subheading/heading/hero variants, `500` (Medium) for
the button label — Satoshi has no Semibold/`600` weight, so `500` stands in for it there. Override
`typography` via `ZelaqProvider`'s `theme` prop to use a different font entirely.

`fontSize`/`lineHeight` are stored as px-equivalent numbers (native consumes them directly). On
web, `Text` and `Button` format them as `rem` rather than `px`, so they scale with the browser's
or OS's font-size/zoom setting instead of staying visually fixed — the same accessibility behavior
native gets for free via `allowFontScaling`.

### Font loading

[Satoshi](https://www.fontshare.com/fonts/satoshi) is provided by Fontshare / Indian Type
Foundry, under the [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl), which
permits embedding it in mobile and desktop applications for permitted uses. **The `zelaq-ui` npm
package does not include or redistribute Satoshi font files** — loading it is the consuming
app's responsibility. If it isn't loaded, components fall back to the platform default sans-serif
rather than failing.

- **Web**: Storybook and the playground both load Satoshi via Fontshare's hosted web font CSS/API
  — see `.storybook/preview-head.html` and `apps/ZelaqWebPlayground/index.html`.
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
