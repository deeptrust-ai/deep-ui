import { Button as FrostedButton, Text as FrostedText } from 'frosted-ui';
import type { ICalendarChipsProps } from './types';
import styles from './styles.module.css';

const CalendarChip = ({ date }: { date: Date }) => {
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <FrostedButton className={styles.calendarChip} variant={isToday ? 'solid' : 'ghost'}>
      <FrostedText size="2">{date.toLocaleDateString('en-US', { day: '2-digit' })}</FrostedText>
      <FrostedText size="2">{date.toLocaleDateString('en-US', { weekday: 'short' })}</FrostedText>
    </FrostedButton>
  );
};

const CalendarChips = ({
  numberDaysShown = 1,
  selectedDate: selectedDateProp,
}: ICalendarChipsProps) => {
  const selectedDate = new Date(selectedDateProp);

  const chips = [];
  for (let i = numberDaysShown - 1; i >= 0; i--) {
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() - i);
    chips.push(<CalendarChip key={date.toISOString()} date={date} />);
  }

  if (chips.length > 1) {
    return <div className={styles.container}>{chips}</div>;
  }

  return <CalendarChip date={selectedDate} />;
};

export default CalendarChips;
export type { ICalendarChipsProps } from './types';
