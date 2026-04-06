import type { Meta, StoryObj } from '@storybook/react-vite';

import { EntityDropdown, type IEntityDropdownProps } from '../..';
import { BuildingsIcon, SquaresFourIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atom/EntityDropdown',
  component: EntityDropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => <EntityDropdown {...args} />,
} satisfies Meta<IEntityDropdownProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const organizationArgs = {
  label: 'Organizations',
  icon: <BuildingsIcon size={16} weight="bold" />,
  entities: [
    { name: 'Acme, Inc', selected: true },
    { name: 'Monsters Inc' },
    { name: 'Stark Industries' },
  ],
};

export const Organizations: Story = {
  args: {
    ...organizationArgs,
  },
};

export const Workspaces: Story = {
  args: {
    label: 'Workspaces',
    icon: <SquaresFourIcon size={16} weight="bold" />,
    entities: [
      { name: 'Platform', selected: true },
      { name: 'Research' },
      { name: 'Sandbox' },
    ],
  },
};

export const Default: Story = {
  args: {
    ...organizationArgs,
  },
};
