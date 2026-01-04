import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge as RadixBadge, Text as RadixText } from '@radix-ui/themes';

import { Table, type ITableProps } from '../..';
import type { ReactNode } from 'react';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';

function generateDate() {
  const start = new Date('2025-01-01');
  const end = new Date('2025-12-31');
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRows(numRows: number) {
  const severity = [
    <RadixBadge color="red">Critical</RadixBadge>,
    <RadixBadge color="yellow">Warning</RadixBadge>,
    <RadixBadge color="blue">Info</RadixBadge>,
  ];
  const orgs = ['Executive', 'Finance', 'HR', 'Engineering', 'Marketing'];
  const status = ['Exclusive', 'Default', 'Critical', 'Info'];
  const randomItem = (items: unknown[]): ReactNode =>
    items[Math.floor(Math.random() * items.length)] as ReactNode;

  return Array.from({ length: numRows }).map((_, index) => ({
    id: `row-${index}`,
    cells: [
      {
        id: `event-${index}`,
        content: (
          <>
            <RadixText size="3" weight="medium" as="p">
              Deepfake Detected
            </RadixText>
            <RadixText size="2" weight="regular">
              Attendees: Sean, Noah, Aman
            </RadixText>
          </>
        ),
      },
      { id: `severity-${index}`, content: randomItem(severity) },
      { id: `date-${index}`, content: generateDate().toLocaleDateString() },
      { id: `orgs-${index}`, content: randomItem(orgs) },
      { id: `status-${index}`, content: randomItem(status) },
    ],
    actions: [
      {
        label: 'View Details',
        onClick: () => alert(`Viewing details for row ${index}`),
        icon: CaretDoubleRightIcon,
      },
    ],
  }));
}

const meta = {
  title: 'Compound/Table',
  component: Table,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    headers: ['Event', 'Severity', 'Date', 'Organization', 'Status'],
    rows: generateRows(25),
    totalItems: 25,
  },
  tags: ['autodocs'],
} satisfies Meta<ITableProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
