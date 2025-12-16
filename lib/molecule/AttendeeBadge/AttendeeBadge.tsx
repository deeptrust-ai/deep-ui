import type { IAttendeeBadgeProps } from './AttendeeBadge.types';
import styles from './AttendeeBadge.module.css';
import { Badge } from 'frosted-ui';
import type { PropsWithChildren } from 'react';
import Chip from '../../atom/Chip/Chip';

const AttendeeBadge = ({
  children,
  chip,
  icon: Icon,
  ...rest
}: PropsWithChildren<IAttendeeBadgeProps>) => {
  return (
    <Badge className={styles.container} color="gray" variant="surface" highContrast {...rest}>
      {Icon && <Icon weight="bold" size="16px" />}
      {children}
      {chip && <Chip text={chip} />}
    </Badge>
  );
};

export default AttendeeBadge;
export type { IAttendeeBadgeProps };
