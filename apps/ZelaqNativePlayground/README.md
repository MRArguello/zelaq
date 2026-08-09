# Zelaq Native Playground

Expo playground for developing and testing [`@zelaq/ui`](../../packages/zelaq-ui) on React
Native. Not a standalone app — its only purpose is exercising the library's components on native.

## Running

From the monorepo root:

```bash
pnpm dev:native
```

This starts the Expo dev server (`npx expo start`). From there, open in a development build,
Android emulator, iOS simulator, or Expo Go.

Rebuild `@zelaq/ui` after changing its source:

```bash
pnpm build:ui
```

App entry is `app/index.tsx`, wrapped in `UIProvider` in `app/_layout.tsx`.
