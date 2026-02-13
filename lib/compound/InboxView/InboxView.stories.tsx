import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxView, type IInboxViewProps } from '../..';

const meta = {
  title: 'Compound/InboxView',
  component: InboxView,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<IInboxViewProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
