import type { Meta, StoryObj } from '@storybook/react';

import { Table, type ITableProps } from '../..';

const meta = {
  title: 'Compound/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<ITableProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
