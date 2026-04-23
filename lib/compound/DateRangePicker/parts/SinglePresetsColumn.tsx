import { Flex } from '@radix-ui/themes';
import { isSameDay } from 'date-fns';

import styles from '../DateRangePicker.module.css';
import type { IDatePreset } from '../DateRangePicker.types';

interface ISinglePresetsColumnProps {
  readonly presets: readonly IDatePreset[];
  readonly selected: Date | undefined;
  readonly today: Date;
  readonly onSelect: (date: Date) => void;
}

const SinglePresetsColumn = ({
  presets,
  selected,
  today,
  onSelect,
}: ISinglePresetsColumnProps) => {
  return (
    <Flex direction="column" gap="1" className={styles.presetsColumn} asChild>
      <ul>
        {presets.map((preset) => {
          const date = preset.getDate(today);
          const isActive = selected ? isSameDay(date, selected) : false;
          return (
            <li key={preset.id} className={styles.presetItem}>
              <button
                type="button"
                className={styles.presetButton}
                data-active={isActive || undefined}
                aria-pressed={isActive}
                onClick={() => onSelect(date)}
              >
                {preset.label}
              </button>
            </li>
          );
        })}
      </ul>
    </Flex>
  );
};

export default SinglePresetsColumn;
