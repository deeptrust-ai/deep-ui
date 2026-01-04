import { Box, Flex, Text as RadixText } from '@radix-ui/themes';
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
    <Flex align="center" pr="2" className={styles.barGraph}>
      <Box
        width={`${percentage}%`}
        position="absolute"
        height="100%"
        className={cn(styles.filledBar, styles[variant])}
      />
      <Flex align="center" gap="2" pl="2">
        {Icon && <Icon weight="bold" />}
        <RadixText size="2">{label}</RadixText>
      </Flex>
      <RadixText size="2" ml="auto">
        {percentage}%
      </RadixText>
    </Flex>
  );
};

export default TextBarGraph;
export type { ITextBarGraphProps };
