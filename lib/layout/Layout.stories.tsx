import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@radix-ui/themes';

import Layout from './Layout.tsx';
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
    menuPages: [
      { label: 'Home', link: '/', icon: AcornIcon, selected: false },
      { label: 'About', link: '/about', icon: AcornIcon, selected: false },
      {
        label: 'Services',
        link: '/services',
        icon: AcornIcon,
        subPages: [
          { label: 'Consulting', link: '/services/consulting', selected: false },
          { label: 'Development', link: '/services/development', selected: false },
        ],
      },
      { label: 'Contact', link: '/contact', icon: AcornIcon, selected: false },
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
