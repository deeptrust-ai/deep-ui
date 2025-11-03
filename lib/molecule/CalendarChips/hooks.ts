type GetDateRangeParams = {
  endDate: Date;
  days: number;
};

export const getDateRange = ({ endDate, days }: GetDateRangeParams): Date[] => {
  if (Number.isNaN(endDate.getTime()) || days <= 0) {
    return [];
  }

  const dates: Date[] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - offset);
    dates.push(date);
  }

  return dates;
};
