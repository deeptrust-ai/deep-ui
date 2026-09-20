import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo, type ILogoProps } from '../..';

const CUSTOM_LOGO_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64" viewBox="0 0 240 64"><rect width="240" height="64" rx="12" fill="#3e63dd"/><text x="120" y="41" font-family="sans-serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">ACME</text></svg>'
)}`;

const meta = {
  title: 'Atom/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  args: { size: 'medium' },
  tags: ['autodocs'],
} satisfies Meta<ILogoProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLogo: Story = {
  args: {
    src: CUSTOM_LOGO_SRC,
    alt: 'ACME logo',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
