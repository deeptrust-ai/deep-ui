import type { BadgeProps } from '@radix-ui/themes';

/** Props for the {@link Badge} atom component. */
export type IBadgeProps =
  | BadgeProps
  | (Omit<BadgeProps, 'children'> & {
      /**
       * @deprecated Use `children` instead.
       */
      label: string;
      children?: never;
    });
