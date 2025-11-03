import { useMemo } from 'react';

type GetDateRangeParams = {
  endDate: Date;
  days: number;
};

const getDateRange = ({ endDate, days }: GetDateRangeParams): Date[] => {
  if (Number.isNaN(endDate.getTime()) || days <= 0) {
    return [];
  }

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const targetOffsetMinutes = endDate.getTimezoneOffset();

  const dates: Date[] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(endDate.getTime() - offset * millisecondsInDay);
    const offsetDifference = date.getTimezoneOffset() - targetOffsetMinutes;

    if (offsetDifference !== 0) {
      date.setMinutes(date.getMinutes() + offsetDifference);
    }

    dates.push(date);
  }

  return dates;
};

export const useCalendarChips = (endDate: Date, days: number) => {
  return useMemo(() => getDateRange({ endDate, days }), [endDate, days]);
};
