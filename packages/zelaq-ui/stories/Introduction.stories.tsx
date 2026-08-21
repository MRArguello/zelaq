import type { Meta, StoryObj } from '@storybook/react-vite';
import { lightPalette, darkPalette } from '../src/theme/palette';

// Not a component — palette.ts is internal (never exported from the package), so this exists
// purely to make the raw shades behind the semantic ColorTokens inspectable in Storybook. Title
// is 'Introduction' (not 'Foundations/Palette') and forced first via preview.tsx's storySort,
// so this is the landing page for library consumers.

const meta = {
  title: 'Introduction',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ name, value, textColor }: { name: string; value: string; textColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          background: value,
          border: '1px solid rgba(128, 128, 128, 0.3)',
          flexShrink: 0,
        }}
      />
      <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.4, color: textColor }}>
        <div>{name}</div>
        <div style={{ opacity: 0.6 }}>{value}</div>
      </div>
    </div>
  );
}

function PaletteGrid({ palette, textColor }: { palette: Record<string, string>; textColor: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
      {Object.entries(palette).map(([name, value]) => (
        <Swatch key={name} name={name} value={value} textColor={textColor} />
      ))}
    </div>
  );
}

export const Light: Story = {
  name: 'Light palette',
  render: () => <PaletteGrid palette={lightPalette} textColor={lightPalette.ink900} />,
};

export const Dark: Story = {
  name: 'Dark palette',
  render: () => (
    <div style={{ background: darkPalette.mineral900, padding: 24, borderRadius: 8 }}>
      <PaletteGrid palette={darkPalette} textColor={darkPalette.mineral100} />
    </div>
  ),
};
