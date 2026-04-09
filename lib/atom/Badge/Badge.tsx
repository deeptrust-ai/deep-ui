import { Badge as RadixBadge } from '@radix-ui/themes';
import type { IBadgeProps } from './types';

const Badge = ({ children, ...rest }: IBadgeProps) => {
  return (
    <RadixBadge size="1" variant="surface" radius="large" {...rest}>
      {children}
    </RadixBadge>
  );
};

export default Badge;
export type { IBadgeProps } from './types';
