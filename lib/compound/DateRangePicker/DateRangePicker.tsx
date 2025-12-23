'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { addDays, format } from 'date-fns';
import {
  CalendarIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
} from '@phosphor-icons/react';
import { type DateRange, type DayPickerProps, DayPicker } from 'react-day-picker';

import './DateRangePicker.module.css';
import type { IDateRangePickerProps } from './DateRangePicker.types';

import { ContentWrapper } from '../../atom';

type _Components = NonNullable<DayPickerProps['components']>;
type ChevronComponent = _Components extends { Chevron: infer C } ? C : never;
type ChevronProps = ChevronComponent extends (props: infer P) => unknown ? P : never;

const ChevronWrap = React.forwardRef<HTMLSpanElement, ChevronProps>(
  ({ style, orientation, ...props }, ref) => {
    switch (orientation) {
      case 'left':
        return (
          <span
            ref={ref}
            style={style as React.CSSProperties}
            {...(props as unknown as Record<string, unknown>)}
          >
            <CaretLeftIcon weight="bold" {...props} />
          </span>
        );
      case 'up':
        return (
          <span
            ref={ref}
            style={style as React.CSSProperties}
            {...(props as unknown as Record<string, unknown>)}
          >
            <CaretUpIcon weight="bold" {...props} size="12" />
          </span>
        );
      case 'down':
        return (
          <span
            ref={ref}
            style={style as React.CSSProperties}
            {...(props as unknown as Record<string, unknown>)}
          >
            <CaretDownIcon weight="bold" {...props} size="12" />
          </span>
        );
      case 'right':
      default:
        return (
          <span
            ref={ref}
            style={style as React.CSSProperties}
            {...(props as unknown as Record<string, unknown>)}
          >
            <CaretRightIcon weight="bold" {...props} />
          </span>
        );
    }
  }
);

// Use DayPicker's component map type so we don't retype the Chevron signature.
const components: DayPickerProps['components'] = {
  Chevron: ChevronWrap as unknown as ChevronComponent,
};

const fallbackStartDate = new Date();
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
          {displayDate?.from ? (
            displayDate.to ? (
              <>
                {format(displayDate.from, 'LLL dd, y')} - {format(displayDate.to, 'LLL dd, y')}
              </>
            ) : (
              format(displayDate.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <ContentWrapper mt="2">
          <DayPicker
            mode="range"
            captionLayout="dropdown"
            components={components}
            selected={draftDate}
            onSelect={handleSelect}
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
