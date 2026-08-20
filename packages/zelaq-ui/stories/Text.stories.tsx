import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../src';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Regular body text',
  },
};

export const Heading: Story = {
  args: {
    variant: 'heading2',
    children: 'Section heading',
  },
};

export const BodySmallMuted: Story = {
  name: 'Small, muted',
  args: {
    variant: 'bodySmall',
    tone: 'muted',
    children: 'Supporting text',
  },
};

export const HeroDangerCentered: Story = {
  name: 'Hero, danger, centered',
  args: {
    variant: 'hero4',
    tone: 'danger',
    align: 'center',
    children: 'Validation message',
  },
};

export const Success: Story = {
  args: {
    variant: 'body',
    tone: 'success',
    children: 'Saved successfully',
  },
};

export const Inverse: Story = {
  name: 'Inverse tone (on a dark background)',
  args: {
    variant: 'body',
    tone: 'inverse',
    children: 'Text on a dark surface',
  },
  render: (args) => (
    <div style={{ background: '#111827', padding: 16, borderRadius: 8 }}>
      <Text {...args} />
    </div>
  ),
};

export const Alignment: Story = {
  args: {
    variant: 'body',
    children: 'Aligned text',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      <Text {...args} align="left">
        Left
      </Text>
      <Text {...args} align="center">
        Center
      </Text>
      <Text {...args} align="right">
        Right
      </Text>
    </div>
  ),
};

export const HeadingLevels: Story = {
  name: 'Heading levels (as prop)',
  args: {
    variant: 'heading2',
    children: 'Section heading',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text {...args} as="h1" />
      <Text {...args} as="h2" />
      <Text {...args} as="h3" />
      <Text {...args} as="h4" />
      <Text {...args} as="h5" />
      <Text {...args} as="h6" />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All variants',
  args: {
    children: 'The quick brown fox',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text {...args} variant="hero1" />
      <Text {...args} variant="hero2" />
      <Text {...args} variant="hero3" />
      <Text {...args} variant="hero4" />
      <Text {...args} variant="heading1" />
      <Text {...args} variant="heading2" />
      <Text {...args} variant="heading3" />
      <Text {...args} variant="heading4" />
      <Text {...args} variant="subheading" />
      <Text {...args} variant="body" />
      <Text {...args} variant="bodySmall" />
      <Text {...args} variant="bodyXs" />
      <Text {...args} variant="bodyXxs" />
    </div>
  ),
};
