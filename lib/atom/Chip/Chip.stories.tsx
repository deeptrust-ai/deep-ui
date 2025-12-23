import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, type IChipProps } from '../..';

const meta = {
  title: 'Atom/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    text: 'VIP',
  },
} satisfies Meta<IChipProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
