import { Flex } from '@radix-ui/themes';
import type { DateRange } from 'react-day-picker';
import { isSameDay } from 'date-fns';

import styles from '../DateRangePicker.module.css';
import type { IDateRangePreset } from '../DateRangePicker.types';

interface IPresetsColumnProps {
  readonly presets: readonly IDateRangePreset[];
  readonly selected: DateRange | undefined;
  readonly today: Date;
  readonly onSelect: (range: DateRange) => void;
}

const isRangeEqual = (a: DateRange, b: DateRange): boolean => {
  if (!a.from || !b.from) return false;
  if (!isSameDay(a.from, b.from)) return false;
  if (!a.to && !b.to) return true;
  if (!a.to || !b.to) return false;
  return isSameDay(a.to, b.to);
};

const PresetsColumn = ({ presets, selected, today, onSelect }: IPresetsColumnProps) => {
  return (
    <Flex direction="column" gap="1" className={styles.presetsColumn} asChild>
      <ul>
        {presets.map((preset) => {
          const range = preset.getRange(today);
          const isActive = selected ? isRangeEqual(range, selected) : false;
          return (
            <li key={preset.id} className={styles.presetItem}>
              <button
                type="button"
                className={styles.presetButton}
                data-active={isActive || undefined}
                onClick={() => onSelect(range)}
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

export default PresetsColumn;
