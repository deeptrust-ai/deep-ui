import type { Meta, StoryObj } from '@storybook/react-vite';
import { TranscriptItem, type ITranscriptItemProps } from '../..';

const meta = {
  title: 'Molecule/TranscriptItem',
  component: TranscriptItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<ITranscriptItemProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
