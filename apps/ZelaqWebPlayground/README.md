# Zelaq Web Playground

Web playground for developing and testing [`@zelaq/ui`](../../packages/zelaq-ui). Not a
standalone app — its only purpose is exercising the library's components on web.

## Running

From the monorepo root:

```bash
pnpm dev:web
```

This starts Storybook on `http://localhost:6006`, where components are documented and tested
(`src/stories/`). For ad hoc manual checks outside Storybook, run the plain Vite app
(`src/App.tsx`) from this directory instead:

```bash
pnpm dev
```

Rebuild `@zelaq/ui` after changing its source:

```bash
pnpm build:ui
```
