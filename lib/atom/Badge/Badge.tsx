import { Badge as FrostedBadge, Text as FrostedText } from '@radix-ui/themes';
import styles from './styles.module.css';
import type { IBadgeProps } from './types';

const Badge = ({ label }: IBadgeProps) => {
  return (
    <FrostedBadge size="1" className={styles.badge}>
      <FrostedText size="1" color="blue">
        {label}
      </FrostedText>
    </FrostedBadge>
  );
};

export default Badge;
export type { IBadgeProps } from './types';
