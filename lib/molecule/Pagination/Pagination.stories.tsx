import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, type IPaginationProps } from '..';

const meta = {
  title: 'Molecule/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalItems: 100,
    defaultItemsPerPage: '10',
    onPageChange: (page: number) => {
      alert(`Page changed to: ${page}`);
    },
  },
} satisfies Meta<IPaginationProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
