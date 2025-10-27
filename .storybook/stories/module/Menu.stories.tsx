import type { Meta, StoryObj } from '@storybook/react';

import { Menu, type IMenuProps } from '../../../lib';
import { AcornIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Module/Menu',
  component: Menu,
  args: {
    pages: [
      { label: 'Home', link: '/', icon: <AcornIcon />, selected: false },
      { label: 'About', link: '/about', icon: <AcornIcon />, selected: false },
      {
        label: 'Services',
        link: '/services',
        icon: <AcornIcon />,
        subPages: [
          { label: 'Consulting', link: '/services/consulting', selected: false },
          { label: 'Development', link: '/services/development', selected: false },
        ],
      },
      { label: 'Contact', link: '/contact', icon: <AcornIcon />, selected: false },
    ],
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<IMenuProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  // label: 'Menu Item',
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
