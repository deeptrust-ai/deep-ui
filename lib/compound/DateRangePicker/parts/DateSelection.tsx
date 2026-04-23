import { Select } from '@radix-ui/themes';
import type { ChangeEvent } from 'react';
import type { DropdownProps } from 'react-day-picker';

const DateSelection = (props: DropdownProps) => {
  // react-day-picker supplies a localized accessible name (e.g. "Choose the
  // Month" / "Choose the Year") as the dropdown's `aria-label`. Forward it to
  // the Select trigger so the underlying combobox has a discernible name
  // (Radix's Select.Trigger does not inherit name-from-contents because it
  // exposes `role="combobox"`).
  const ariaLabel = props['aria-label'];

  return (
    <Select.Root
      size="1"
      value={props.value?.toString()}
      onValueChange={(value) => {
        if (props.onChange) {
          const syntheticEvent = {
            target: { value },
          } as ChangeEvent<HTMLSelectElement>;
          props.onChange(syntheticEvent);
        }
      }}
      disabled={props.disabled}
    >
      <Select.Trigger aria-label={ariaLabel} />
      <Select.Content>
        {props.options?.map((option) => (
          <Select.Item
            disabled={option.disabled}
            key={option.value}
            value={option.value.toString()}
          >
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default DateSelection;
