import { Text } from 'frosted-ui';
import type { IChipProps } from './Chip.types';
import styles from './Chip.module.css';

const Chip = ({ text }: IChipProps) => {
  if (!text) return null;

  return (
    <Text className={styles.container} weight="medium" size="0">
      {String(text).toUpperCase()}
    </Text>
  );
};

export default Chip;
export type { IChipProps };
