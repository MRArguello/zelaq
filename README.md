# zelaq

Monorepo for **zelaq-ui**, a cross-platform component library for React and React Native.

- [`packages/zelaq-ui`](./packages/zelaq-ui) — the library itself, its README, and its Storybook stories.
- Component docs (props, usage, accessibility): [zelaq-ui.netlify.app](https://zelaq-ui.netlify.app)
- [`apps/ZelaqWebPlayground`](./apps/ZelaqWebPlayground) / [`apps/ZelaqNativePlayground`](./apps/ZelaqNativePlayground) — demo apps consuming the published package.

## Contributors

```bash
pnpm install   # also installs the pre-commit hook, via the root "prepare" script
```

Every commit runs typecheck, lint, and tests (web + native) across all workspaces —
see the `precommit` script in the root `package.json`. Run it manually with:

```bash
pnpm run precommit
```
