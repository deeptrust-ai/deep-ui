import { Badge as RadixBadge } from '@radix-ui/themes';
import type { BadgeProps } from '@radix-ui/themes';
import type { IBadgeProps } from './types';

const Badge = (props: IBadgeProps) => {
  const { children, label, ...rest } = props as BadgeProps & { label?: string };

  return (
    <RadixBadge size="1" variant="surface" radius="large" {...rest}>
      {children ?? label}
    </RadixBadge>
  );
};

export default Badge;
export type { IBadgeProps } from './types';
