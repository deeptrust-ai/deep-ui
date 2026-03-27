import type { Icon as PhosIconTypes } from '@phosphor-icons/react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

/** Anchor element props for a {@link MenuItem}, excluding `children`. */
export type MenuItemAnchorProps<TAnchor extends ElementType = 'a'> = Omit<
  ComponentPropsWithoutRef<TAnchor>,
  'children'
> & {
  readonly className?: string;
};

/** Props for the {@link MenuItem} atom component. */
export interface IMenuItemProps<TAnchor extends ElementType = 'a'> {
  readonly anchorComponent?: TAnchor;
  readonly anchorProps?: MenuItemAnchorProps<TAnchor>;
  readonly icon?: PhosIconTypes;
  readonly label: string;
  readonly selected?: boolean;
  readonly subpage?: boolean;
  readonly heading?: boolean;
  readonly activeClassName?: string;
}
