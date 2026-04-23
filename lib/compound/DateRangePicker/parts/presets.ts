import {
  addDays,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from 'date-fns';

import type { IDatePreset, IDateRangePreset } from '../DateRangePicker.types';

/**
 * Default quick-select presets shown in the left column of the DateRangePicker popover.
 *
 * All ranges are relative to the current day and inclusive on both ends.
 */
export const DEFAULT_DATE_RANGE_PRESETS: readonly IDateRangePreset[] = [
  {
    id: 'today',
    label: 'Today',
    getRange: (today) => ({ from: today, to: today }),
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    getRange: (today) => {
      const yesterday = subDays(today, 1);
      return { from: yesterday, to: yesterday };
    },
  },
  {
    id: 'last-7-days',
    label: 'Last 7 days',
    getRange: (today) => ({ from: subDays(today, 6), to: today }),
  },
  {
    id: 'last-14-days',
    label: 'Last 14 days',
    getRange: (today) => ({ from: subDays(today, 13), to: today }),
  },
  {
    id: 'last-30-days',
    label: 'Last 30 days',
    getRange: (today) => ({ from: subDays(today, 29), to: today }),
  },
  {
    id: 'this-month',
    label: 'This month',
    getRange: (today) => ({ from: startOfMonth(today), to: today }),
  },
  {
    id: 'last-month',
    label: 'Last month',
    getRange: (today) => {
      const lastMonth = subMonths(today, 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    },
  },
  {
    id: 'this-year',
    label: 'This year',
    getRange: (today) => ({ from: startOfYear(today), to: endOfYear(today) }),
  },
];

/**
 * Default quick-select presets shown in the left column of the DateRangePicker
 * popover when `mode="single"`.
 *
 * Forward-looking defaults tuned for due-date selectors.
 */
export const DEFAULT_DATE_PRESETS: readonly IDatePreset[] = [
  {
    id: 'today',
    label: 'Today',
    getDate: (today) => today,
  },
  {
    id: 'tomorrow',
    label: 'Tomorrow',
    getDate: (today) => addDays(today, 1),
  },
  {
    id: 'in-7-days',
    label: 'In 7 days',
    getDate: (today) => addDays(today, 7),
  },
  {
    id: 'in-14-days',
    label: 'In 14 days',
    getDate: (today) => addDays(today, 14),
  },
  {
    id: 'in-30-days',
    label: 'In 30 days',
    getDate: (today) => addDays(today, 30),
  },
];
