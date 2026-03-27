import type { Icon } from '@phosphor-icons/react';
import type { BadgeProps } from '@radix-ui/themes';

/** Props for the {@link AttendeeBadge} molecule component. */
export interface IAttendeeBadgeProps extends BadgeProps {
  readonly chip?: string;
  readonly icon?: Icon;
}
