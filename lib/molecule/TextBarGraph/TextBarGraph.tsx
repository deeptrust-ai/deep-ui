import { Flex, Text as FrostedText } from '@radix-ui/themes';
import cn from 'classnames';
import type { ITextBarGraphProps } from './TextBarGraph.types';
import styles from './TextBarGraph.module.css';

const TextBarGraph = ({
  percentage: percentageProp,
  label,
  Icon,
  variant = 'info',
}: ITextBarGraphProps) => {
  const percentage = Math.max(0, Math.min(100, percentageProp));

  return (
    <Flex
      align="center"
      px="2"
      data-graph-width={`${percentage}`}
      className={cn(styles.barGraph, styles[variant])}
    >
      <Flex align="center" gap="2">
        {Icon && <Icon weight="bold" />}
        <FrostedText size="2">{label}</FrostedText>
      </Flex>
      <FrostedText size="2" ml="auto">
        {percentage}%
      </FrostedText>
    </Flex>
  );
};

export default TextBarGraph;
export type { ITextBarGraphProps };

{
  /* <div className={styles.container}>
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
</div> */
}
