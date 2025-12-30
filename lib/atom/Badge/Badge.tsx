import { Badge as RadixBadge } from '@radix-ui/themes';
import type { IBadgeProps } from './types';

const Badge = ({ label, ...rest }: IBadgeProps) => {
  return (
    <RadixBadge size="1" variant="surface" radius="large" {...rest}>
      {label}
    </RadixBadge>
  );
};

export default Badge;
export type { IBadgeProps } from './types';
