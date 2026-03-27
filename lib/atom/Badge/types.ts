import type { BadgeProps } from '@radix-ui/themes';

/** Props for the {@link Badge} atom component. */
export interface IBadgeProps extends BadgeProps {
  /** The text label to be displayed inside the badge */
  label: string;
}
