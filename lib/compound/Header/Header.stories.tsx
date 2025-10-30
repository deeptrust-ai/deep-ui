import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '..';

const meta = {
  title: 'Compound/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Header>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
