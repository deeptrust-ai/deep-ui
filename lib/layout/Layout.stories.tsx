import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@radix-ui/themes';

import Layout from './Layout.tsx';

const meta = {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
  args: {
    sidebar: undefined,
    children: <Container size="1">Item 1</Container>,
  },
  tags: ['autodocs'],
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
