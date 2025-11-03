export interface ICalendarChipsProps {
  /* The date to be selected */
  readonly selectedDate?: Date;
  /* Number of chips to show including the selected date chip */
  readonly numberDaysShown?: 1 | 3 | 5 | 7;
}
