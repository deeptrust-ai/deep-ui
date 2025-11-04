import type { Meta, StoryObj } from '@storybook/react';
import {
  Provider as RadixToastProvider,
  Viewport as RadixToastViewport,
} from '@radix-ui/react-toast';

import { Toast, type IToastProps } from '..';

const meta = {
  title: 'Atom/Toast',
  component: Toast,
  args: {
    message: 'Welcome to DeepUI',
    duration: 99999999999,
    variant: 'error',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <RadixToastProvider>
        <Story />
        <RadixToastViewport />
      </RadixToastProvider>
    ),
  ],
} satisfies Meta<IToastProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toast message="This is a success toast!" variant="success" duration={0} />
      <Toast message="This is an error toast!" variant="error" duration={0} />
      <Toast message="This is an info toast!" variant="info" duration={0} />
      <Toast message="This is a warning toast!" variant="warning" duration={0} />
    </div>
  ),
};
