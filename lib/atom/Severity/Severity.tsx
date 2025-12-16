import { Flex } from '@radix-ui/themes';
import { Text, type TextProps } from 'frosted-ui';
import cn from 'classnames';
import type { ISeverityProps } from './Severity.types';
import styles from './Severity.module.css';

const getTextColor = (level: ISeverityProps['level']): TextProps['color'] => {
  switch (level) {
    case 'critical':
      return 'crimson';
    case 'high':
      return 'orange';
    case 'medium':
      return 'blue';
    case 'low':
      return 'gray';
    case 'info':
      return 'cyan';
    case 'success':
    default:
      return 'green';
  }
};

const Severity = ({ level, textOnly, iconOnly }: ISeverityProps) => {
  const dotStyles = cn(styles.dot, styles[level]);

  const textColor = getTextColor(level);
  const displayText = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <Flex display="inline-flex" align="center" gap="2">
      {(iconOnly || !textOnly) && <span className={dotStyles} />}
      {(!iconOnly || textOnly) && (
        <Text size="2" color={textColor}>
          {displayText}
        </Text>
      )}
    </Flex>
  );
};

export default Severity;
