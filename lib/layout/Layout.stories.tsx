import { AcornIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '@radix-ui/themes';

import Layout from './Layout';

const meta = {
  title: 'Guides/03. Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    sidebar: undefined,
    children: <Container size="1">Item 1</Container>,
    userName: 'Chewbacca',
    organizations: [
      {
        id: 'org-1',
        name: 'Millennium Falcon',
      },
      {
        id: 'org-2',
        name: 'Death Star',
      },
      {
        id: 'org-3',
        name: 'X-Wing',
      },
    ],
    workspaces: [
      { id: 'ws-1', name: 'Main Workspace' },
      { id: 'ws-2', name: 'Read Only Workspace' },
    ],
    links: [
      {
        anchorProps: { href: '/' },
        icon: AcornIcon,
        label: 'Dashboard',
        selected: true,
      },
      {
        anchorProps: { href: '/issues' },
        icon: AcornIcon,
        label: 'Issues',
      },
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
