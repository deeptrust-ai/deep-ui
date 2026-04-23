import type { DateRange } from 'react-day-picker';

/** A quick-select preset shown in the left column of the {@link DateRangePicker} popover. */
export interface IDateRangePreset {
  /** Unique id used for keying/selection state. */
  readonly id: string;
  /** Label shown on the preset button. */
  readonly label: string;
  /** Returns the date range for this preset, given the current date. */
  readonly getRange: (today: Date) => DateRange;
}

/** Props for the {@link DateRangePicker} compound component. */
export interface IDateRangePickerProps {
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly onChange?: (fromDate: Date | null, toDate: Date | null) => void;
  readonly disabled?: boolean;
  /**
   * Quick-select presets shown in the left column of the popover.
   * Pass an empty array to hide the preset column. Defaults to a common set
   * (Today, Yesterday, Last 7/14/30 days, This/Last month, This year).
   */
  readonly presets?: readonly IDateRangePreset[];
}
