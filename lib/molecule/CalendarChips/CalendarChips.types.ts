export interface ICalendarChipsProps {
  /* The date to be selected */
  readonly selectedDate?: Date;
  /* The end date for the range of dates to show */
  readonly endDate?: Date;
  /* Number of chips to show including the selected date chip */
  readonly numberDaysShown?: 1 | 3 | 5 | 7;
}
