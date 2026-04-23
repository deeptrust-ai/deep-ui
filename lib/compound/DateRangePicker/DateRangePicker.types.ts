import type { DateRange } from 'react-day-picker';

/** A quick-select preset shown in the left column of the {@link DateRangePicker} popover in `range` mode. */
export interface IDateRangePreset {
  /** Unique id used for keying/selection state. */
  readonly id: string;
  /** Label shown on the preset button. */
  readonly label: string;
  /** Returns the date range for this preset, given the current date. */
  readonly getRange: (today: Date) => DateRange;
}

/** A quick-select preset shown in the left column of the {@link DateRangePicker} popover in `single` mode. */
export interface IDatePreset {
  /** Unique id used for keying/selection state. */
  readonly id: string;
  /** Label shown on the preset button. */
  readonly label: string;
  /** Returns the date for this preset, given the current date. */
  readonly getDate: (today: Date) => Date;
}

interface IDateRangePickerCommonProps {
  readonly disabled?: boolean;
}

/** Props for {@link DateRangePicker} in range mode (the default). */
export interface IDateRangePickerRangeProps extends IDateRangePickerCommonProps {
  readonly mode?: 'range';
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly onChange?: (fromDate: Date | null, toDate: Date | null) => void;
  /**
   * Quick-select presets shown in the left column of the popover.
   * Pass an empty array to hide the preset column. Defaults to a common set
   * (Today, Yesterday, Last 7/14/30 days, This/Last month, This year).
   */
  readonly presets?: readonly IDateRangePreset[];
}

/** Props for {@link DateRangePicker} in single-date mode. */
export interface IDateRangePickerSingleProps extends IDateRangePickerCommonProps {
  readonly mode: 'single';
  /** Currently selected date, or `undefined` for no selection. */
  readonly value?: Date;
  readonly onChange?: (date: Date | null) => void;
  /** Optional placeholder shown on the trigger button when no date is selected. */
  readonly placeholder?: string;
  /**
   * Quick-select presets shown in the left column of the popover.
   * Pass an empty array to hide the preset column. Defaults to a small
   * forward-looking set suitable for due-date pickers (Today, Tomorrow,
   * In 7/14/30 days).
   */
  readonly presets?: readonly IDatePreset[];
}

/** Props for the {@link DateRangePicker} compound component. */
export type IDateRangePickerProps =
  | IDateRangePickerRangeProps
  | IDateRangePickerSingleProps;
