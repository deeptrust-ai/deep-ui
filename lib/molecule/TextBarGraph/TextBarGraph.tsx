import { Card as FrostedCard, Text as FrostedText } from '@radix-ui/themes';
import cn from 'classnames';
import type { ITextBarGraphProps } from './types';
import styles from './styles.module.css';

const TextBarGraph = ({ percentage: percentageProp, label, Icon, variant }: ITextBarGraphProps) => {
  const percentage = Math.max(0, Math.min(100, percentageProp));

  return (
    <div className={styles.container}>
      <FrostedCard
        size="2"
        className={cn(styles.barGraph, {
          [styles.default]: variant === 'default' || !variant,
          [styles.danger]: variant === 'danger',
          [styles.info]: variant === 'info',
          [styles.warning]: variant === 'warning',
        })}
        style={{
          width: `${percentage}%`,
        }}
      />
      <div className={styles.barGraphLabel}>
        {Icon && <Icon weight="bold" />}
        <FrostedText size="2" className={styles.label}>
          {label}
        </FrostedText>
        <FrostedText size="2">{percentage}%</FrostedText>
      </div>
    </div>
  );
};

export default TextBarGraph;
export type { ITextBarGraphProps };
