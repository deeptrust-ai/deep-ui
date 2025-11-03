import type { Meta, StoryObj } from '@storybook/react';

import { CalendarChips, type ICalendarChipsProps } from '../..';

const defaultArgs: ICalendarChipsProps = {
  numberDaysShown: 7,
  endDate: new Date('2025-11-03T00:00:00'),
  selectedDate: new Date('2025-10-31T00:00:00'),
};

const meta = {
  title: 'Molecule/CalendarChips',
  component: CalendarChips,
  parameters: {
    layout: 'centered',
  },
  args: { ...defaultArgs },
  tags: ['autodocs'],
} satisfies Meta<ICalendarChipsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
