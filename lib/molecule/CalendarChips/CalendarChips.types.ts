/** Props for the {@link CalendarChips} molecule component. */
export interface ICalendarChipsProps {
  /** The currently selected date. */
  readonly selectedDate?: Date;
  /** The end date for the visible range. */
  readonly endDate?: Date;
  /** Number of day chips to render (including the selected date). */
  readonly numberDaysShown?: 1 | 3 | 5 | 7;
}
