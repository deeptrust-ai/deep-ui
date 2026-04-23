'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Flex, Theme } from '@radix-ui/themes';
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from '@phosphor-icons/react';
import { type DateRange, type DayPickerProps, DayPicker } from 'react-day-picker';

import styles from './DateRangePicker.module.css';
import type {
  IDateRangePickerProps,
  IDateRangePickerRangeProps,
} from './DateRangePicker.types';

import { ContentWrapper } from '../../atom';
import DateSelection from './parts/DateSelection';
import NextMonthButton from './parts/NextMonthButton';
import PresetsColumn from './parts/PresetsColumn';
import SingleCalendar from './parts/SingleCalendar';
import { DEFAULT_DATE_RANGE_PRESETS } from './parts/presets';

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

const RangeCalendar = ({
  fromDate: fromDateProp,
  toDate: toDateProp,
  onChange,
  disabled,
  presets = DEFAULT_DATE_RANGE_PRESETS,
}: Omit<IDateRangePickerRangeProps, 'mode'>) => {
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
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const displayDate = isControlled && !isPopoverOpen ? controlledDate : draftDate;
  const [today, setToday] = useState(() => new Date());
  const hasPresets = presets.length > 0;

  useEffect(() => {
    if (!isPopoverOpen) return;

    const handleScroll = (event: Event) => {
      const target = event.target as Node;
      if (popoverContentRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-radix-select-viewport]')) return;
      setIsPopoverOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { capture: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [isPopoverOpen]);

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

  const handlePresetSelect = (range: DateRange) => {
    setDraftDate(range);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(open) => {
        setIsPopoverOpen(open);
        if (open) {
          setToday(new Date());
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
      <PopoverPortal>
        <Theme asChild>
        <PopoverContent
          ref={popoverContentRef}
          align="start"
          sideOffset={4}
          collisionPadding={10}
          className={styles.popoverContent}
          aria-label="Choose a date range"
        >
          <ContentWrapper>
            <Flex gap="3" align="stretch">
              {hasPresets ? (
                <PresetsColumn
                  presets={presets}
                  selected={draftDate}
                  today={today}
                  onSelect={handlePresetSelect}
                />
              ) : null}
              <Flex direction="column" gap="2" className={styles.calendarColumn}>
                <DayPicker
                  mode="range"
                  captionLayout="dropdown"
                  components={components}
                  selected={draftDate}
                  onSelect={handleSelect}
                  className={styles.dayPicker}
                  modifiersClassNames={{
                    today: styles.today,
                    range_start: styles.rangeStart,
                    range_end: styles.rangeEnd,
                    range_middle: styles.rangeMiddle,
                    selected: styles.rangeButton,
                  }}
                />
                <Flex gap="1" justify="end">
                  <Button variant="outline" color="crimson" onClick={handleReset} size="1">
                    Reset
                  </Button>
                  <Button onClick={handleApply} size="1">
                    Apply
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ContentWrapper>
        </PopoverContent>
        </Theme>
      </PopoverPortal>
    </Popover>
  );
};

const DateRangePicker = (props: IDateRangePickerProps) => {
  if (props.mode === 'single') {
    const { mode, ...rest } = props;
    void mode;
    return <SingleCalendar {...rest} />;
  }
  const { mode, ...rest } = props;
  void mode;
  return <RangeCalendar {...rest} />;
};

export default DateRangePicker;
