import type { Meta, StoryObj } from '@storybook/react';

import { MenuItem, type IMenuItemProps } from '../..';
import { AcornIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atom/Badge',
  component: MenuItem,
  args: {
    subItem: false,
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

const defaultArgs: IMenuItemProps = {
  label: 'Badge',
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
