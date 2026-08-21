# Zelaq Native Playground

Expo playground for developing and testing [`zelaq-ui`](../../packages/zelaq-ui) on React
Native. Not a standalone app — its only purpose is exercising the library's components on native.

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

## Font loading (not yet set up)

`zelaq-ui` defaults to [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare / Indian
Type Foundry, [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl)) but doesn't
ship the font — this app loads it locally, which isn't wired up yet. Until it is, text renders in
the platform default font.

To set it up:

1. Download Satoshi directly from [fontshare.com/fonts/satoshi](https://www.fontshare.com/fonts/satoshi)
   and review the current license before shipping.
2. Place the downloaded files in `assets/fonts/` and configure the app with their actual
   filenames/weights — don't assume names you haven't confirmed. `zelaq-ui`'s theme uses weights
   `400`/`500`/`700`. This repo is public — consider `.gitignore`-ing the font files.
3. Load them in `app/_layout.tsx` with `expo-font`'s `useFonts`, gating the first render behind
   them so nothing paints with the wrong font momentarily:

```tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

// inside RootLayout, before the existing return:
const [fontsLoaded] = useFonts({
  Satoshi: require('../assets/fonts/<the file you downloaded for weight 400>'),
});

useEffect(() => {
  if (fontsLoaded) SplashScreen.hideAsync();
}, [fontsLoaded]);

if (!fontsLoaded) return null;
```

`expo-font` is already a dependency. Static font weights can render inconsistently on Android —
if `fontWeight` alone doesn't select the right weight, register a separate font family per weight
instead and reference it via a `ZelaqProvider` theme override.
