import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '@radix-ui/themes';

import { Callout, type ICalloutProps } from '../..';

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
        message="This is a success callout!"
        variant="success"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is an error callout!"
        variant="error"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is an info callout!"
        variant="info"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
      <Callout
        message="This is a warning callout!"
        variant="warning"
        onClick={() => {
          alert('Callout action clicked!');
        }}
      />
    </Flex>
  ),
};
