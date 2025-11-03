import type { Meta, StoryObj } from '@storybook/react';

import { CalendarChips, type ICalendarChipsProps } from '../..';

const defaultArgs: ICalendarChipsProps = {
  numberDaysShown: 7,
  selectedDate: new Date('2025-10-31'),
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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
