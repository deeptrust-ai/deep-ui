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
    columns: undefined,
    children: <Container size="1">Item 1</Container>,
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Layout>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Half: Story = {
  args: {
    columns: {
      Content: <Container size="1">Item 2</Container>,
      split: 'half',
    },
  },
};

export const Thirds: Story = {
  args: {
    columns: {
      Content: <Container size="1">Item 2</Container>,
      split: 'third',
    },
  },
};
