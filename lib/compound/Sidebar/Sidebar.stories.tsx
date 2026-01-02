import type { Meta, StoryObj } from '@storybook/react-vite';
import { AcornIcon } from '@phosphor-icons/react';

import { Sidebar } from '../..';

const meta = {
  title: 'Compound/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  args: {
    menuPages: [
      { label: 'Home', anchorProps: { href: '/' }, icon: AcornIcon, selected: true },
      { label: 'About', anchorProps: { href: '/about' }, icon: AcornIcon },
      {
        label: 'Services',
        anchorProps: { href: '/services' },
        icon: AcornIcon,
        subPages: [
          { label: 'Consulting', anchorProps: { href: '/services/consulting' } },
          { label: 'Development', anchorProps: { href: '/services/development' } },
        ],
      },
      { label: 'Contact', anchorProps: { href: '/contact' }, icon: AcornIcon },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Sidebar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
