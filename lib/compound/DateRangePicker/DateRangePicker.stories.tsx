import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker, type IDateRangePickerProps } from '../..';
import { Flex, Text } from '@radix-ui/themes';
import { subDays } from 'date-fns';
import { useState } from 'react';

const meta = {
  title: 'Compound/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<IDateRangePickerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const defaultFromDate = new Date();
const defaultToDate = subDays(defaultFromDate, -4);

export const WithInitialRange: Story = {
  args: {
    fromDate: defaultFromDate,
    toDate: defaultToDate,
  },
};

const ControlledStory = () => {
  const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
  const [toDate, setToDate] = useState<Date | null>(defaultToDate);

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
