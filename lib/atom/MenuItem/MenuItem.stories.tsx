import type { Meta, StoryObj } from '@storybook/react-vite';

import { MenuItem, type IMenuItemProps } from '../..';
import { AcornIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atom/MenuItem',
  component: MenuItem,
  args: {
    anchorProps: { href: '#' },
    subpage: false,
    label: 'Menu Item',
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<IMenuItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const Icon: Story = {
  args: {
    icon: AcornIcon,
  },
};

export const SubItem: Story = {
  args: {
    subpage: true,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const SelectedDynamically: Story = {
  args: {
    anchorProps: { href: '#', className: 'active' },
  },
};

export const SelectedSubItem: Story = {
  args: {
    subpage: true,
    selected: true,
  },
};

export const SelectedSubItemDynamically: Story = {
  args: {
    subpage: true,
    anchorProps: { href: '#', className: 'active' },
  },
};
