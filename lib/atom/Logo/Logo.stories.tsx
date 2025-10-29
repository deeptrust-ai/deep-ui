import type { Meta, StoryObj } from '@storybook/react';

import { Logo, type ILogoProps } from '..';

const meta = {
  title: 'Atom/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  args: { variant: 'full' },
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

export const IconOnly: Story = {
  args: {
    variant: 'icon',
  },
};

export const WordmarkOnly: Story = {
  args: {
    variant: 'wordmark',
    size: 'small',
  },
};
