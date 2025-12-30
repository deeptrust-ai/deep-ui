import type { Meta, StoryObj } from '@storybook/react-vite';
import { AttendeeBadge, type IAttendeeBadgeProps } from '../..';
import { AcornIcon } from '@phosphor-icons/react';

const meta = {
  title: 'Molecule/AttendeeBadge',
  component: AttendeeBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'John Doe',
    chip: 'VIP',
    icon: AcornIcon,
  },
} satisfies Meta<IAttendeeBadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
