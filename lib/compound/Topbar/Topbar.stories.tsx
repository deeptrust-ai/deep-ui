import type { Meta, StoryObj } from '@storybook/react';

import { Topbar } from '../index.ts';

const meta = {
  title: 'Compound/Topbar',
  component: Topbar,
  parameters: {
    layout: 'centered',
  },
  args: {
    organizations: [
      { name: 'Organization 1', selected: true },
      { name: 'Organization 2' },
      { name: 'Organization 3' },
    ],
    userName: 'Jane Doe',
    userPfp: 'https://i.pravatar.cc/150?img=70',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Topbar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
