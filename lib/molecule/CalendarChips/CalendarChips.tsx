import { Button as FrostedButton, Text as FrostedText } from 'frosted-ui';
import { useMemo } from 'react';
import { useCalendarChips } from './hooks';
import type { ICalendarChipsProps } from './types';
import styles from './styles.module.css';

const CalendarChip = ({ date, selected }: { readonly date: Date; readonly selected?: boolean }) => {
  return (
    <FrostedButton className={styles.calendarChip} variant={selected ? 'solid' : 'ghost'}>
      <FrostedText size="2">{date.toLocaleDateString('en-US', { day: '2-digit' })}</FrostedText>
      <FrostedText size="2">{date.toLocaleDateString('en-US', { weekday: 'short' })}</FrostedText>
    </FrostedButton>
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

  return <div className={styles.container}>{chips}</div>;
};

export default CalendarChips;
export type { ICalendarChipsProps } from './types';
