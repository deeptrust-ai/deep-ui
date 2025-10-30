import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '..';

const meta = {
  title: 'Compound/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  args: {
    organizations: [
      { name: 'Organization 1', selected: true },
      { name: 'Organization 2' },
      { name: 'Organization 3', isTrial: true },
    ],
    userName: 'Jane Doe',
    userPfp: 'https://i.pravatar.cc/150?img=70',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Header>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
