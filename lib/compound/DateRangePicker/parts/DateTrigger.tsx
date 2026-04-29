'use client';

import { Button, TextField } from '@radix-ui/themes';
import { PopoverAnchor, PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from '@phosphor-icons/react';
import { forwardRef, type KeyboardEvent } from 'react';

interface IDateTriggerProps {
  /** Variant of the trigger. `'button'` renders a compact outline button; `'input'` renders a readonly Radix `TextField.Root` with a leading calendar icon slot. */
  readonly variant: 'button' | 'input';
  /** Formatted label for the selected value — rendered inside the trigger when non-empty. */
  readonly label: string | null;
  /** Placeholder shown when `label` is empty. */
  readonly placeholder: string;
  /** Whether the trigger is disabled. */
  readonly disabled?: boolean;
  /** Accessible name announced when focus lands on the trigger. */
  readonly ariaLabel: string;
  /** Current open state of the parent popover (used only by the input variant). */
  readonly isOpen: boolean;
  /** Called with `true` when the input variant wants the popover to open (click / Enter / Space / ArrowDown). */
  readonly onOpenRequest: () => void;
  /** Id of the `PopoverContent`. Used only by the input variant to wire `role="combobox"` + `aria-controls` so `aria-expanded` is valid for axe. */
  readonly popoverId: string;
}

/**
 * Renders the trigger element that opens the date picker popover.
 *
 * - **`variant='button'`** — uses `<PopoverTrigger asChild>` with a Radix
 *   `<Button variant="outline">`; the popover's open state is fully owned by
 *   the built-in trigger.
 * - **`variant='input'`** — uses `<PopoverAnchor asChild>` with a readonly
 *   `<TextField.Root>` + leading calendar icon slot, and manually wires
 *   click / keyboard handlers to `onOpenRequest` so the popover opens on
 *   click (including on the slot icon) and on Enter / Space / ArrowDown.
 *   Closing is handled by Radix's built-in outside-click + Escape behaviour
 *   on the popover content itself.
 */
const DateTrigger = forwardRef<HTMLElement, IDateTriggerProps>(
  (
    {
      variant,
      label,
      placeholder,
      disabled,
      ariaLabel,
      isOpen,
      onOpenRequest,
      popoverId,
    },
    ref
  ) => {
    if (variant === 'input') {
      const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          onOpenRequest();
        }
      };

      const handleOpen = () => {
        if (disabled) return;
        onOpenRequest();
      };

      return (
        <PopoverAnchor asChild>
          <TextField.Root
            ref={ref as React.Ref<HTMLInputElement>}
            /*
             * `role="combobox"` is required for `aria-expanded` to be valid on
             * a plain `<input>` (axe flags it otherwise). `aria-controls`
             * pairs the combobox with the dialog that holds the calendar.
             */
            role="combobox"
            aria-controls={popoverId}
            readOnly
            value={label ?? ''}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
          >
            <TextField.Slot side="left" onClick={handleOpen}>
              <CalendarIcon />
            </TextField.Slot>
          </TextField.Root>
        </PopoverAnchor>
      );
    }

    return (
      <PopoverTrigger asChild>
        <Button
          ref={ref as React.Ref<HTMLButtonElement>}
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
