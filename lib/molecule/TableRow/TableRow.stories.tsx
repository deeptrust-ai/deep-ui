import type { Meta, StoryObj } from '@storybook/react';
import { TableRow, type ITableRowProps } from '..';

const meta = {
  title: 'Molecule/TableRow',
  component: TableRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<ITableRowProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
