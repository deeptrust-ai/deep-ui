'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Flex, Theme } from '@radix-ui/themes';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from '@phosphor-icons/react';
import { type DayPickerProps, DayPicker } from 'react-day-picker';

import styles from '../DateRangePicker.module.css';
import type { IDateRangePickerSingleProps } from '../DateRangePicker.types';

import { ContentWrapper } from '../../../atom';
import DateSelection from './DateSelection';
import NextMonthButton from './NextMonthButton';
import SinglePresetsColumn from './SinglePresetsColumn';
import { DEFAULT_DATE_PRESETS } from './presets';

const components: DayPickerProps['components'] = {
  YearsDropdown: DateSelection,
  MonthsDropdown: DateSelection,
  NextMonthButton: NextMonthButton,
  PreviousMonthButton: NextMonthButton,
};

const formatDateLabel = (date: Date | undefined) => {
  if (!date) return null;
  return format(date, 'LLL dd, y');
};

const DEFAULT_PLACEHOLDER = 'Pick a date';

const SingleCalendar = ({
  value,
  onChange,
  disabled,
  placeholder = DEFAULT_PLACEHOLDER,
  presets = DEFAULT_DATE_PRESETS,
}: Omit<IDateRangePickerSingleProps, 'mode'>) => {
  const isControlled = value !== undefined;

  const [draftDate, setDraftDate] = useState<Date | undefined>(value);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const displayDate = isControlled && !isPopoverOpen ? value : draftDate;
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
    (next: Date | undefined) => {
      onChange?.(next ?? null);
    },
    [onChange]
  );

  const handleApply = () => {
    notifyChange(draftDate);
    setIsPopoverOpen(false);
  };

  const handleReset = () => {
    setDraftDate(value);
    notifyChange(value);
    setIsPopoverOpen(false);
  };

  const handleSelect = (selected: Date | undefined) => {
    setDraftDate(selected);
  };

  const handlePresetSelect = (date: Date) => {
    setDraftDate(date);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(open) => {
        setIsPopoverOpen(open);
        if (open) {
          setToday(new Date());
          setDraftDate(isControlled ? value : draftDate);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" disabled={disabled}>
          <CalendarIcon />
          {displayDate ? formatDateLabel(displayDate) : <span>{placeholder}</span>}
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
          >
            <ContentWrapper>
              <Flex gap="3" align="stretch">
                {hasPresets ? (
                  <SinglePresetsColumn
                    presets={presets}
                    selected={draftDate}
                    today={today}
                    onSelect={handlePresetSelect}
                  />
                ) : null}
                <Flex direction="column" gap="2" className={styles.calendarColumn}>
                  <DayPicker
                    mode="single"
                    captionLayout="dropdown"
                    components={components}
                    selected={draftDate}
                    onSelect={handleSelect}
                    className={styles.dayPicker}
                    modifiersClassNames={{
                      today: styles.today,
                      day_button: styles.dayBtn,
                      selected: styles.singleSelected,
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

export default SingleCalendar;
