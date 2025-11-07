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

export const Default: Story = {};
export const FiftyFifty: Story = {
  args: {
    columns: {
      Content: <Container size="1">Item 2</Container>,
      split: '50-50',
    },
  },
};
export const ThirtySeventy: Story = {
  args: {
    columns: {
      Content: <Container size="1">Item 2</Container>,
      split: '30-70',
    },
  },
};
export const SeventyThirty: Story = {
  args: {
    columns: {
      Content: <Container size="1">Item 2</Container>,
      split: '70-30',
    },
  },
};
