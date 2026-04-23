import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker, type IDateRangePickerProps } from '../..';
import { Flex, Text } from '@radix-ui/themes';
import { addDays, subDays } from 'date-fns';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

const FIXED_FROM_DATE = new Date('2026-01-15T12:00:00.000Z');
const FIXED_TO_DATE = subDays(FIXED_FROM_DATE, -4);

const meta = {
  title: 'Compound/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    fromDate: FIXED_FROM_DATE,
    toDate: FIXED_TO_DATE,
  },
} satisfies Meta<IDateRangePickerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialRange: Story = {
  args: {
    fromDate: FIXED_FROM_DATE,
    toDate: FIXED_TO_DATE,
  },
};

const ControlledStory = () => {
  const [fromDate, setFromDate] = useState<Date | null>(FIXED_FROM_DATE);
  const [toDate, setToDate] = useState<Date | null>(FIXED_TO_DATE);

  const formatValue = (value: Date | null) =>
    value
      ? value.toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—';

  return (
    <Flex direction="column" gap="2" align="center">
      <DateRangePicker
        fromDate={fromDate ?? undefined}
        toDate={toDate ?? undefined}
        onChange={(nextFrom, nextTo) => {
          setFromDate(nextFrom);
          setToDate(nextTo);
        }}
      />
      <Text size="2" color="gray">
        {formatValue(fromDate)} → {formatValue(toDate)}
      </Text>
    </Flex>
  );
};

export const Controlled: Story = {
  render: ControlledStory,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithoutPresets: Story = {
  args: {
    fromDate: FIXED_FROM_DATE,
    toDate: FIXED_TO_DATE,
    presets: [],
  },
};

export const CustomPresets: Story = {
  args: {
    fromDate: FIXED_FROM_DATE,
    toDate: FIXED_TO_DATE,
    presets: [
      {
        id: 'q1',
        label: 'Q1',
        getRange: (today) => ({
          from: new Date(today.getFullYear(), 0, 1),
          to: new Date(today.getFullYear(), 2, 31),
        }),
      },
      {
        id: 'q2',
        label: 'Q2',
        getRange: (today) => ({
          from: new Date(today.getFullYear(), 3, 1),
          to: new Date(today.getFullYear(), 5, 30),
        }),
      },
      {
        id: 'q3',
        label: 'Q3',
        getRange: (today) => ({
          from: new Date(today.getFullYear(), 6, 1),
          to: new Date(today.getFullYear(), 8, 30),
        }),
      },
      {
        id: 'q4',
        label: 'Q4',
        getRange: (today) => ({
          from: new Date(today.getFullYear(), 9, 1),
          to: new Date(today.getFullYear(), 11, 31),
        }),
      },
    ],
  },
};

export const Single: Story = {
  args: {
    mode: 'single',
    value: FIXED_FROM_DATE,
  },
};

const ControlledSingleStory = () => {
  const [date, setDate] = useState<Date | null>(FIXED_FROM_DATE);

  const formatValue = (value: Date | null) =>
    value
      ? value.toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      : '—';

  return (
    <Flex direction="column" gap="2" align="center">
      <DateRangePicker
        mode="single"
        value={date}
        onChange={(next) => setDate(next)}
      />
      <Text size="2" color="gray">
        {formatValue(date)}
      </Text>
    </Flex>
  );
};

export const SingleControlled: Story = {
  render: ControlledSingleStory,
};

export const SingleWithoutPresets: Story = {
  args: {
    mode: 'single',
    value: FIXED_FROM_DATE,
    presets: [],
  },
};

export const SingleWithCustomPresets: Story = {
  args: {
    mode: 'single',
    value: FIXED_FROM_DATE,
    presets: [
      { id: 'today', label: 'Today', getDate: (today) => today },
      { id: 'next-week', label: 'Next week', getDate: (today) => addDays(today, 7) },
      { id: 'next-month', label: 'Next month', getDate: (today) => addDays(today, 30) },
    ],
  },
};

export const SinglePlaceholder: Story = {
  args: {
    mode: 'single',
    placeholder: 'Select due date',
  },
};

// ── Chromatic visual regression: popover open states ────────────────────────
//
// The Radix popover renders into a portal at document.body, so the opened
// content is not inside `canvasElement`. We wait on `within(document.body)`.

const openPopoverPlay = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const trigger = await canvas.findByRole('button');
  await userEvent.click(trigger);

  const body = within(document.body);
  const grid = await body.findByRole('grid', undefined, { timeout: 2000 });
  await expect(grid).toBeVisible();
};

export const OpenPopover: Story = {
  args: {
    fromDate: FIXED_FROM_DATE,
    toDate: FIXED_TO_DATE,
  },
  play: openPopoverPlay,
};

export const SingleOpenPopover: Story = {
  args: {
    mode: 'single',
    value: FIXED_FROM_DATE,
  },
  play: openPopoverPlay,
};

export const SingleOpenPopoverNoSelection: Story = {
  args: {
    mode: 'single',
    placeholder: 'Select due date',
  },
  play: openPopoverPlay,
};
