import { Button as FrostedButton, Text as FrostedText } from 'frosted-ui';
import { useMemo } from 'react';
import { getDateRange } from './hooks';
import type { ICalendarChipsProps } from './types';
import styles from './styles.module.css';

const CalendarChip = ({ date }: { date: Date }) => {
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <FrostedButton className={styles.calendarChip} variant={isToday ? 'solid' : 'ghost'}>
      <FrostedText size="2">
        {date.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' })}
      </FrostedText>
      <FrostedText size="2">
        {date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })}
      </FrostedText>
    </FrostedButton>
  );
};

const CalendarChips = ({
  numberDaysShown = 1,
  selectedDate: selectedDateProp,
}: ICalendarChipsProps) => {
  const selectedDate = useMemo(
    () => (selectedDateProp ? new Date(selectedDateProp) : new Date()),
    [selectedDateProp]
  );

  const dates = useMemo(
    () =>
      getDateRange({
        endDate: selectedDate,
        days: numberDaysShown,
      }),
    [selectedDate, numberDaysShown]
  );

  const chips = dates.map((date) => <CalendarChip key={date.toISOString()} date={date} />);

  if (chips.length > 1) {
    return <div className={styles.container}>{chips}</div>;
  }

  return chips[0];
};

export default CalendarChips;
export type { ICalendarChipsProps } from './types';
