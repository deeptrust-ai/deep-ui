import type { Icon } from '@phosphor-icons/react';
import type { BadgeProps } from 'frosted-ui';

export interface IAttendeeBadgeProps extends BadgeProps {
  readonly chip?: string;
  readonly icon?: Icon;
}
