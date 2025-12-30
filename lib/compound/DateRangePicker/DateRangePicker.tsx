'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from '@phosphor-icons/react';
import { type DateRange, type DayPickerProps, DayPicker } from 'react-day-picker';

import styles from './DateRangePicker.module.css';
import type { IDateRangePickerProps } from './DateRangePicker.types';

import { ContentWrapper } from '../../atom';
import DateSelection from './parts/DateSelection';
import NextMonthButton from './parts/NextMonthButton';

const components: DayPickerProps['components'] = {
  YearsDropdown: DateSelection,
  MonthsDropdown: DateSelection,
  NextMonthButton: NextMonthButton,
  PreviousMonthButton: NextMonthButton,
};

const fallbackStartDate = new Date();
const formatDateRangeLabel = (range: DateRange | undefined) => {
  if (!range?.from) return null;

  if (!range.to) {
    return format(range.from, 'LLL dd, y');
  }

  const sameYear = range.from.getFullYear() === range.to.getFullYear();
  const fromFormat = sameYear ? 'LLL dd' : 'LLL dd, y';

  return `${format(range.from, fromFormat)} - ${format(range.to, 'LLL dd, y')}`;
};

const DateRangePicker = ({
  fromDate: fromDateProp,
  toDate: toDateProp,
  onChange,
  disabled,
}: IDateRangePickerProps) => {
  const isControlled = fromDateProp !== undefined || toDateProp !== undefined;

  const controlledDate = useMemo<DateRange>(
    () => ({
      from: fromDateProp ?? fallbackStartDate,
      to: toDateProp ?? addDays(fromDateProp ?? fallbackStartDate, 5),
    }),
    [fromDateProp, toDateProp]
  );

  const [draftDate, setDraftDate] = useState<DateRange | undefined>(controlledDate);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const displayDate = isControlled && !isPopoverOpen ? controlledDate : draftDate;

  const notifyChange = useCallback(
    (nextDate: DateRange | undefined) => {
      onChange?.(nextDate?.from ?? null, nextDate?.to ?? null);
    },
    [onChange]
  );

  const handleApply = () => {
    notifyChange(draftDate);
    setIsPopoverOpen(false);
  };

  const handleReset = () => {
    setDraftDate(controlledDate);
    notifyChange(controlledDate);
    setIsPopoverOpen(false);
  };

  const handleSelect = (selected: DateRange | undefined) => {
    setDraftDate(selected);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(open) => {
        setIsPopoverOpen(open);
        if (open) {
          setDraftDate(isControlled ? controlledDate : draftDate);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" disabled={disabled}>
          <CalendarIcon />
          {displayDate?.from ? formatDateRangeLabel(displayDate) : <span>Pick a date range</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={4} className={styles.popoverContent}>
        <ContentWrapper>
          <DayPicker
            mode="range"
            captionLayout="dropdown"
            components={components}
            selected={draftDate}
            onSelect={handleSelect}
            className={styles.dayPicker}
            modifiersClassNames={{
              today: styles.today,
              day_button: styles.dayBtn,
              range_start: styles.rangeStart,
              range_end: styles.rangeEnd,
              range_middle: styles.rangeMiddle,
              selected: styles.rangeButton,
            }}
          />
          <Flex gap="1" justify="end" mt="2">
            <Button variant="outline" color="crimson" onClick={handleReset} size="1">
              Reset
            </Button>
            <Button onClick={handleApply} size="1">
              Apply
            </Button>
          </Flex>
        </ContentWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
