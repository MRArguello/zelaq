# Zelaq Native Playground

Expo playground for developing and testing [`zelaq-ui`](../../packages/zelaq-ui) on React
Native.

## Running

From the monorepo root:

```bash
pnpm dev:native
```

This starts the Expo dev server (`npx expo start`). From there, open in a development build,
Android emulator, iOS simulator, or Expo Go.

Rebuild `zelaq-ui` after changing its source:

```bash
pnpm build:ui
```

App entry is `app/index.tsx`, wrapped in `ZelaqProvider` in `app/_layout.tsx`.

## Font loading

`zelaq-ui` defaults to [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare / Indian
Type Foundry, [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl)) but doesn't
ship the font — this app loads the `400`/`500`/`700` weights it needs from `assets/fonts/` via
`expo-font`'s `useFonts` in `app/_layout.tsx`.

Each weight is registered under its own family name (`Satoshi`, `Satoshi-Medium`,
`Satoshi-Bold`) and routed to the matching typography tokens through a `ZelaqProvider` `theme`
override — `fontWeight` alone doesn't reliably select the right static weight on native, so this
is the working pattern, not just a fallback.

Two ways to wire multi-weight fonts on native:

- **JS-level (used here)**: `useFonts` loads each weight under its own alias; a `theme` override
  routes tokens to them. No native rebuild, works in plain Expo Go.
- **OS-level**: register the weights as one native font family via an `expo-font` config plugin,
  so `fontWeight` resolves the right file itself, no override needed. Requires `expo prebuild`
  and real `ios`/`android` folders — not used here to keep this app on plain Expo Go.
