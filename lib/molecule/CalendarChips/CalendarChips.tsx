import { Flex, Button, Text } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useCalendarChips } from './hooks';
import type { ICalendarChipsProps } from './CalendarChips.types';

const CalendarChip = ({ date, selected }: { readonly date: Date; readonly selected?: boolean }) => {
  return (
    <Flex
      asChild
      align="center"
      justify="center"
      direction="column"
      gap="0"
      py="0"
      px="0"
      width="42px"
      height="56px"
    >
      <Button variant={selected ? 'solid' : 'surface'} color={selected ? 'blue' : 'gray'}>
        <Text size="2">{date.toLocaleDateString('en-US', { day: '2-digit' })}</Text>
        <Text size="2">{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
      </Button>
    </Flex>
  );
};

const CalendarChips = ({
  numberDaysShown = 1,
  selectedDate: selectedDateProp,
  endDate: endDateProp,
}: ICalendarChipsProps) => {
  const endDate = useMemo(() => (endDateProp ? new Date(endDateProp) : new Date()), [endDateProp]);
  const selectedDate = useMemo(
    () => (selectedDateProp ? new Date(selectedDateProp) : new Date()),
    [selectedDateProp]
  );

  const dates = useCalendarChips(endDate, numberDaysShown);

  const chips = dates.map((date) => {
    return (
      <CalendarChip
        key={date.toISOString()}
        date={date}
        selected={date.toDateString() === selectedDate.toDateString()}
      />
    );
  });

  return (
    <Flex gap="2" align="center">
      {chips}
    </Flex>
  );
};

export default CalendarChips;
export type { ICalendarChipsProps } from './CalendarChips.types';
