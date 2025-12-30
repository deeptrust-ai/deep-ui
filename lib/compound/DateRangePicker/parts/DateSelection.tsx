import { Select } from '@radix-ui/themes';
import type { ChangeEvent } from 'react';
import type { DropdownProps } from 'react-day-picker';

const DateSelection = (props: DropdownProps) => {
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
      <Select.Trigger />
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
