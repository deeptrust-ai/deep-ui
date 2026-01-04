import type { IAttendeeBadgeProps } from './AttendeeBadge.types';
import { Badge, Text } from '@radix-ui/themes';
import type { PropsWithChildren } from 'react';
import Chip from '../../atom/Chip/Chip';
import styles from './AttendeeBadge.module.css';

const AttendeeBadge = ({
  children,
  chip,
  icon: Icon,
  color,
  variant,
  radius,
  className,
  ...rest
}: PropsWithChildren<IAttendeeBadgeProps>) => {
  return (
    <Badge
      color={color ?? 'gray'}
      variant={variant ?? 'surface'}
      radius={radius ?? 'large'}
      className={`${styles.badge} ${className ?? ''}`}
      {...rest}
    >
      {Icon && <Icon weight="bold" size="16px" />}
      <Text size="1">{children}</Text>
      {chip && <Chip text={chip} />}
    </Badge>
  );
};

export default AttendeeBadge;
export type { IAttendeeBadgeProps };
