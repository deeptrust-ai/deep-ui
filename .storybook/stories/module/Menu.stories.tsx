import type { Meta, StoryObj } from '@storybook/react';

import { Menu, type IMenuProps } from '../../../lib';
// import { AcornIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Module/Menu',
  component: Menu,
  args: {
    pages: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      {
        label: 'Services',
        link: '/services',
        subPages: [
          { label: 'Consulting', link: '/services/consulting' },
          { label: 'Development', link: '/services/development' },
        ],
      },
      { label: 'Contact', link: '/contact' },
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
