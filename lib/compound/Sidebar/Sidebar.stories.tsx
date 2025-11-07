import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from '..';

const meta = {
  title: 'Compound/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Sidebar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
