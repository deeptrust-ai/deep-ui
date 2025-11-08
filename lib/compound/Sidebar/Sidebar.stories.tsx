import type { Meta, StoryObj } from '@storybook/react';
import { AcornIcon } from '@phosphor-icons/react';

import { Sidebar } from '..';

const meta = {
  title: 'Compound/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
  args: {
    menuPages: [
      { label: 'Home', link: '/', icon: <AcornIcon />, selected: true },
      { label: 'About', link: '/about', icon: <AcornIcon /> },
      {
        label: 'Services',
        link: '/services',
        icon: <AcornIcon />,
        subPages: [
          { label: 'Consulting', link: '/services/consulting' },
          { label: 'Development', link: '/services/development' },
        ],
      },
      { label: 'Contact', link: '/contact', icon: <AcornIcon /> },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Sidebar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
