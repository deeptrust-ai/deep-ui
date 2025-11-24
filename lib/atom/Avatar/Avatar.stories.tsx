import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, type IAvatarProps } from '../..';

const meta = {
  title: 'Atom/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  args: { name: 'Luke Skywalker' },
  tags: ['autodocs'],
} satisfies Meta<IAvatarProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ProfilePicture: Story = {
  args: {
    pfp: 'https://img.goodfon.com/wallpaper/nbig/c/41/mark-hamill-star-wars-luke.webp',
  },
};
