import { Flex, Text as FrostedText } from '@radix-ui/themes';
import cn from 'classnames';
import type { ITextBarGraphProps } from './TextBarGraph.types';
import styles from './TextBarGraph.module.css';

const TextBarGraph = ({
  percentage: percentageProp,
  label,
  Icon,
  variant = 'default',
}: ITextBarGraphProps) => {
  const percentage = Math.max(0, Math.min(100, percentageProp));

  return (
    <Flex
      align="center"
      px="2"
      style={{ width: `${percentage}%` }}
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
