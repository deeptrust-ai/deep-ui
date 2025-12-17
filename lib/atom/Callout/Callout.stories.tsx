import type { Meta, StoryObj } from '@storybook/react-vite';

import { Callout, type ICalloutProps } from '../..';
import { Flex } from '@radix-ui/themes';

const meta = {
  title: 'Atom/Callout',
  component: Callout,
  args: {
    message: 'Welcome to DeepUI',
    variant: 'error',
    onClick: () => {
      alert('Callout action clicked!');
    },
  },
  tags: ['autodocs'],
} satisfies Meta<ICalloutProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Callout
        message="This is a success toast!"
        variant="success"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is an error toast!"
        variant="error"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is an info toast!"
        variant="info"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is a warning toast!"
        variant="warning"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
    </Flex>
  ),
};
