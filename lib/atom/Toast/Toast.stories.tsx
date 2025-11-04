import type { Meta, StoryObj } from '@storybook/react';

import { Toast, type IToastProps } from '..';

const meta = {
  title: 'Atom/Toast',
  component: Toast,
  args: {
    message: 'Welcome to DeepUI',
    duration: 99999999999,
    variant: `alert`,
  },
  tags: ['autodocs'],
} satisfies Meta<IToastProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
