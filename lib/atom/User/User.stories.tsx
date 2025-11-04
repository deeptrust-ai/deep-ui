import type { Meta, StoryObj } from '@storybook/react';

import { User, type IUserProps } from '..';

const meta = {
  title: 'Atom/User',
  component: User,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'Darth Vader',
    pictureSrc:
      'https://upload.wikimedia.org/wikipedia/commons/9/9c/Darth_Vader_-_2007_Disney_Weekends.jpg',
    position: 'Sith Lord',
  },
  tags: ['autodocs'],
} satisfies Meta<IUserProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
