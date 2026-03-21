import { AcornIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem, type IMenuItemProps } from '../..';

const meta = {
  title: 'Atom/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    anchorProps: {
      href: '#',
    },
    icon: AcornIcon,
    label: 'Dashboard',
  },
} satisfies Meta<IMenuItemProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Heading: Story = {
  args: {
    heading: true,
    label: 'Workspace Settings',
  },
};

export const Subpage: Story = {
  args: {
    subpage: true,
    selected: true,
    label: 'Assigned Users',
  },
};
