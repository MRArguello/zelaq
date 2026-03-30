import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        provider: 'src/provider/index.ts',
        theme: 'src/theme/index.ts',
        'styles/index': 'src/styles/index.ts',
        'styles/index.native': 'src/styles/index.native.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    shims: true,
    external: ['react', 'react-native', 'styled-components'],
});
