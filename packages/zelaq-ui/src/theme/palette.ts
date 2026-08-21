// Foundational color values — raw shades only, no meaning attached. Internal to the theme
// module; never exported from the package. Consumers only ever see the semantic ColorTokens
// in tokens.ts, which is what they're meant to override.
//
// Within each family, lower numbers are lighter, higher numbers are darker — consistent across
// both palettes even though light and dark use different underlying values.

export const lightPalette = {
    teal300: '#8FAEAA',
    teal600: '#0F766E',
    teal700: '#115E59',

    ink700: '#43504D',
    ink900: '#173B3A',
    inkScrim: 'rgba(15, 59, 58, 0.52)',

    mineral0: '#FFFFFF',
    mineral25: '#FBFDFC',
    mineral50: '#F7FCFB',
    mineral75: '#F4F8F7',
    mineral100: '#F4F7F5',
    mineral200: '#C9D9D5',
    mineral300: '#BECAC8',
    mineral500: '#7B9490',
    mineral700: '#58706D',

    red600: '#B42318',
    green600: '#157347',
} as const

export const darkPalette = {
    teal300: '#7ACCC4',
    teal400: '#54B8AE',
    teal800: '#466E6A',

    ink900: '#0D2927',
    inkScrim: 'rgba(4, 18, 18, 0.68)',

    mineral100: '#E5F3F0',
    mineral250: '#A9B9B6',
    mineral300: '#A4BCB8',
    mineral400: '#72918C',
    mineral450: '#34504C',
    mineral500: '#374341',
    mineral600: '#203533',
    mineral700: '#1B2D2A',
    mineral800: '#132321',
    mineral900: '#0D1918',

    red300: '#FF9B91',
    green300: '#7AD9A6',
} as const
