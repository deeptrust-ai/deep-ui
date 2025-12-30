import { Flex } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import cn from 'classnames';
import type { ISeverityProps } from './Severity.types';
import styles from './Severity.module.css';

const Severity = ({ level, textOnly, iconOnly }: ISeverityProps) => {
  const dotStyles = cn(styles.dot, styles[level]);
  const textStyles = cn(styles.text, styles[level]);

  const displayText = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <Flex display="inline-flex" align="center" gap="2">
      {(iconOnly || !textOnly) && <span className={dotStyles} />}
      {(!iconOnly || textOnly) && (
        <Text size="2" className={textStyles}>
          {displayText}
        </Text>
      )}
    </Flex>
  );
};

export default Severity;
export type { ISeverityProps } from './Severity.types';
