import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo, type ILogoProps } from '../..';

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

export const Large: Story = {
  args: {
    size: 'large',
  },
};
