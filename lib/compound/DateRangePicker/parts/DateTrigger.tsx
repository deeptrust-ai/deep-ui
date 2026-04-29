'use client';

import { Button } from '@radix-ui/themes';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from '@phosphor-icons/react';
import { forwardRef } from 'react';

import styles from '../DateRangePicker.module.css';

interface IDateTriggerProps {
  /** Variant of the trigger. `'button'` renders a compact outline button; `'input'` renders a full-width trigger visually styled like a text input with a leading calendar icon. */
  readonly variant: 'button' | 'input';
  /** Formatted label for the selected value — rendered inside the trigger when non-empty. */
  readonly label: string | null;
  /** Placeholder shown when `label` is empty. */
  readonly placeholder: string;
  /** Whether the trigger is disabled. */
  readonly disabled?: boolean;
  /** Accessible name announced when focus lands on the trigger (for screen readers). */
  readonly ariaLabel: string;
}

/**
 * Renders the trigger element that opens the date picker popover. Always used
 * as a child of a Radix `<Popover>`; `<PopoverTrigger asChild>` attaches the
 * toggle behaviour to the underlying `<button>`.
 *
 * The `'input'` variant is a `<button>` styled to mimic `TextField.Root`
 * (surface variant, size 2) so the picker lines up with adjacent form inputs
 * while remaining a single focusable element with full keyboard support.
 */
const DateTrigger = forwardRef<HTMLButtonElement, IDateTriggerProps>(
  ({ variant, label, placeholder, disabled, ariaLabel }, ref) => {
    if (variant === 'input') {
      return (
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-label={ariaLabel}
            className={styles.inputTrigger}
          >
            <CalendarIcon className={styles.inputTriggerIcon} aria-hidden />
            {label ? (
              <span className={styles.inputTriggerLabel}>{label}</span>
            ) : (
              <span
                className={`${styles.inputTriggerLabel} ${styles.inputTriggerPlaceholder}`}
              >
                {placeholder}
              </span>
            )}
          </button>
        </PopoverTrigger>
      );
    }

    return (
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
        >
          <CalendarIcon />
          {label ? label : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
    );
  }
);

DateTrigger.displayName = 'DateTrigger';

export default DateTrigger;
