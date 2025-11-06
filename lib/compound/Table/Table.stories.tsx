import type { Meta, StoryObj } from '@storybook/react';
import { Badge as FrostedBadge, Text as FrostedText } from 'frosted-ui';

import { Table, type ITableProps } from '../..';

function generateDate() {
  const start = new Date('2025-01-01');
  const end = new Date('2025-12-31');
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRows(numRows: number) {
  const severity = [
    <FrostedBadge color="danger">Critical</FrostedBadge>,
    <FrostedBadge color="warning">Warning</FrostedBadge>,
    <FrostedBadge color="info">Info</FrostedBadge>,
  ];
  const orgs = ['Executive', 'Finance', 'HR', 'Engineering', 'Marketing'];
  const status = ['Exclusive', 'Default', 'Critical', 'Info'];
  const randomItem = (items: any[]) => items[Math.floor(Math.random() * items.length)];

  return Array.from({ length: numRows }).map((_, index) => ({
    key: `row-${index}`,
    cells: [
      <>
        <FrostedText size="3" weight="medium" as="p">
          Deepfake Detected
        </FrostedText>
        <FrostedText size="2" weight="regular">
          Attendees: Sean, Noah, Aman
        </FrostedText>
      </>,
      randomItem(severity),
      generateDate().toLocaleDateString(),
      randomItem(orgs),
      randomItem(status),
      () => alert(`Viewing details for row ${index}`),
    ],
  }));
}

const meta = {
  title: 'Compound/Table',
  component: Table,
  args: {
    headers: ['Event', 'Severity', 'Date', 'Organization', 'Status', ''],
    rows: generateRows(25),
    totalItems: 25,
  },
  tags: ['autodocs'],
} satisfies Meta<ITableProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
