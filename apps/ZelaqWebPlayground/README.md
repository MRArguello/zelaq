# Zelaq Web Playground

Web playground for developing and testing [`zelaq-ui`](../../packages/zelaq-ui). 

## Running

```bash
pnpm dev
```

Since this app consumes the built `zelaq-ui` package, rebuild it after changing its source:

```bash
pnpm build:ui
```

## Fonts

`zelaq-ui` defaults to [Satoshi](https://www.fontshare.com/fonts/satoshi). This app loads it via
Fontshare's hosted web font CSS (a `<link>` in `index.html`) — not bundled by the library.
