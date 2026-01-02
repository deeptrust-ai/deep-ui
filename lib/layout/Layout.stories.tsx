import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '@radix-ui/themes';

import Layout from './Layout';
import { AcornIcon } from '@phosphor-icons/react';

const meta = {
  title: 'Guides/03. Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
  args: {
    sidebar: undefined,
    children: <Container size="1">Item 1</Container>,
    userName: 'Chewbacca',
    organizations: [
      {
        name: 'Millennium Falcon',
        selected: true,
      },
      {
        name: 'Death Star',
        selected: false,
      },
      {
        name: 'X-Wing',
        selected: false,
      },
    ],
    menuPages: [
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
  },
  tags: ['!dev'],
} satisfies Meta<React.ComponentProps<typeof Layout>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Half: Story = {
  args: {
    sidebar: (
      <Container size="1" width="150px">
        Item 2
      </Container>
    ),
  },
};
