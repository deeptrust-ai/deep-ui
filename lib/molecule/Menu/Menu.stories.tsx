import type { Meta, StoryObj } from '@storybook/react-vite';

import { Menu, type IMenuProps } from '../..';
import { AcornIcon } from '@phosphor-icons/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Molecule/Menu',
  component: Menu,
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
  pages: [
    { label: 'Home', anchorProps: { href: '/' }, icon: AcornIcon, selected: false },
    { label: 'About', anchorProps: { href: '/about' }, icon: AcornIcon, selected: false },
    {
      label: 'Services',
      anchorProps: { href: '/services' },
      icon: AcornIcon,
      subPages: [
        { label: 'Consulting', anchorProps: { href: '/services/consulting' }, selected: false },
        { label: 'Development', anchorProps: { href: '/services/development' }, selected: false },
      ],
    },
    { label: 'Contact', anchorProps: { href: '/contact' }, icon: AcornIcon, selected: false },
  ],
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Selected: Story = {
  args: {
    pages: defaultArgs.pages.map((page) =>
      page.label === 'About' ? { ...page, selected: true } : page
    ),
  },
};

export const SelectedSubItem: Story = {
  args: {
    pages: defaultArgs.pages.map((page) =>
      page.subPages
        ? {
            ...page,
            subPages: page.subPages.map((subPage) =>
              subPage.label === 'Development' ? { ...subPage, selected: true } : subPage
            ),
          }
        : page
    ),
  },
};
