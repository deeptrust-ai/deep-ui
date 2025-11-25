import { Badge as FrostedBadge, Text as FrostedText } from 'frosted-ui';
import styles from './styles.module.css';
import type { IBadgeProps } from './types';

const Badge = ({ label }: IBadgeProps) => {
  return (
    <FrostedBadge size="1" className={styles.badge}>
      <FrostedText size="0" color="blue">
        {label}
      </FrostedText>
    </FrostedBadge>
  );
};

export default Badge;
export type { IBadgeProps } from './types';
